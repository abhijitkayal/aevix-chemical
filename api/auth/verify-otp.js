import { connectToDatabase } from '../lib/mongoose.js';
import AuthUser from '../../server/models/Authuser.js';
import User from '../../server/models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectToDatabase();

    const { userId, otp } = req.body || {};
    if (!userId || !otp) return res.status(400).json({ message: 'userId and otp required' });

    const user = await AuthUser.findById(userId) || await User.findById(userId);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const storedOtp = user.otp ? String(user.otp).trim() : null;
    const providedOtp = String(otp).trim();
    const now = Date.now();
    const expiry = user.otpExpiry ? new Date(user.otpExpiry).getTime() : null;

    if (!storedOtp || storedOtp !== providedOtp) return res.status(400).json({ message: 'Invalid OTP' });
    if (!expiry || expiry < now) return res.status(400).json({ message: 'OTP expired' });

    // Clear OTP
    await Promise.all([
      AuthUser.updateOne({ _id: user._id }, { $unset: { otp: 1, otpExpiry: 1 } }),
      User.updateOne({ _id: user._id }, { $unset: { otp: 1, otpExpiry: 1 } }),
    ]);

    return res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('serverless verify-otp error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
