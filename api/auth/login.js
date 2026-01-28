import { connectToDatabase } from '../lib/mongoose.js';
import AuthUser from '../../server/models/Authuser.js';
import User from '../../server/models/User.js';
import transporter from '../../server/utils/mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectToDatabase();

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    let user = await AuthUser.findOne({ email }) || await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Invalid password' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // Update without running full document validation
    await Promise.all([
      AuthUser.updateOne({ _id: user._id }, { $set: { otp, otpExpiry } }),
      User.updateOne({ _id: user._id }, { $set: { otp, otpExpiry } }),
    ]);

    // Try sending email. If it fails, return a useful message
    try {
      await transporter.sendMail({
        from: `"Aevix Chemical" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Your Login OTP',
        html: `<h2>Login Verification</h2><p>Your OTP is:</p><h1>${otp}</h1><p>Valid for 5 minutes</p>`,
      });
    } catch (mailErr) {
      console.error('serverless sendMail error:', mailErr);
      // For local dev it's okay to still return success but tell client mail failed
      return res.status(500).json({ message: 'Failed to send OTP email', error: mailErr.message });
    }

    const resp = { message: 'OTP sent to email', otpRequired: true, userId: user._id };

    // Helpful for local dev - return OTP in response when not production
    if (process.env.NODE_ENV !== 'production') resp.devOtp = otp;

    return res.json(resp);
  } catch (err) {
    console.error('serverless login error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
