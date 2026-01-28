import express from 'express';
const router = express.Router();
import AuthUser from '../models/Authuser.js';
import User from '../models/User.js'
import transporter from "../utils/mailer.js";

/* ======================
   TEST ENDPOINT
====================== */
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

router.post('/test-body', (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  res.json({ 
    message: 'Body test', 
    receivedBody: req.body,
    contentType: req.headers['content-type']
  });
});

/* ======================
   LOGIN WITH EMAIL
====================== */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password required",
//       });
//     }

//     /* ======================
//        1️⃣ Check AuthUser
//     ====================== */
//     let user = await AuthUser.findOne({ email });

//     /* ======================
//        2️⃣ If not found, check User
//     ====================== */
//     let userType = "authuser";

//     if (!user) {
//       user = await User.findOne({ email });
//       userType = "user";
//     }

//     /* ======================
//        3️⃣ If not found in BOTH
//     ====================== */
//     if (!user) {
//       return res.status(401).json({
//         message: "User not found",
//       });
//     }

//     /* ======================
//        4️⃣ Check password
//     ====================== */
//     if (user.password !== password) {
//       return res.status(401).json({
//         message: "Invalid password",
//       });
//     }

//     /* ======================
//        5️⃣ LOGIN SUCCESS
//     ====================== */
//     // Prefer role from the found user; if missing (e.g. AuthUser), check User collection for the role
//     let role = user.role;
//     if (!role) {
//       try {
//         const other = await User.findOne({ email });
//         if (other && other.role) role = other.role;
//       } catch (e) {
//         // ignore
//       }
//     }

//     // Debug: log resolution for role
//     console.log(`LOGIN: email=${email} userType=${userType} foundId=${user._id} userRole=${user.role || 'NONE'} resolvedRole=${role || 'NONE'}`);

//     res.json({
//       message: "Login successful",
//       userType, // "authuser" or "user"
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: role || "N/A",
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({
//       message: "Server error",
//       error: err.message,
//     });
//   }
// });


router.post("/login", async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { email, password } = req.body || {};

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    let user = await AuthUser.findOne({ email }) || await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 🔐 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Attach OTP and expiry (update using updateOne so we don't trigger full document validation)
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    try {
      // Attempt to update in both collections; one of them will match
      const [authRes, userRes] = await Promise.all([
        AuthUser.updateOne({ _id: user._id }, { $set: { otp, otpExpiry } }),
        User.updateOne({ _id: user._id }, { $set: { otp, otpExpiry } }),
      ]);

      // Optional debug — warn if no document was matched
      const matched = (authRes && (authRes.matchedCount || authRes.n || authRes.modifiedCount)) || (userRes && (userRes.matchedCount || userRes.n || userRes.modifiedCount));
      if (!matched) {
        console.warn('OTP update did not match any document for user', user._id);
      }
    } catch (saveErr) {
      console.error('Error saving user during login (updateOne):', saveErr);
      return res.status(500).json({ message: 'Failed to update user for OTP', error: saveErr.message, name: saveErr.name });
    }

    // ✉️ Send OTP email (handle SMTP errors separately so client gets useful info)
    try {
      await transporter.sendMail({
        from: `"Aevix Chemical" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Your Login OTP",
        html: `
          <h2>Login Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>Valid for 5 minutes</p>
        `,
      });
    } catch (mailErr) {
      console.error('sendMail error:', mailErr);
      return res.status(500).json({ message: 'Failed to send OTP email', error: mailErr.message });
    }

    res.json({
      message: "OTP sent to email",
      otpRequired: true,
      userId: user._id,
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.post("/verify-otp", async (req, res) => {
  try {
    const { userId, otp } = req.body || {};

    if (!userId || !otp) {
      return res.status(400).json({ message: 'userId and otp required' });
    }

    const user = await AuthUser.findById(userId) || await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const storedOtp = user.otp ? String(user.otp).trim() : null;
    const providedOtp = String(otp).trim();
    const now = Date.now();
    const expiry = user.otpExpiry ? new Date(user.otpExpiry).getTime() : null;

    if (process.env.NODE_ENV !== 'production') {
      console.log('verify-otp debug:', { userId, storedOtp, providedOtp, expiry, now, expired: expiry && expiry < now });
    }

    if (!storedOtp || storedOtp !== providedOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (!expiry || expiry < now) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Clear OTP using updateOne to avoid full document validation errors
    await Promise.all([
      AuthUser.updateOne({ _id: user._id }, { $unset: { otp: 1, otpExpiry: 1 } }),
      User.updateOne({ _id: user._id }, { $unset: { otp: 1, otpExpiry: 1 } }),
    ]);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('verify-otp error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



/* ======================
   REGISTER NEW USER
====================== */
router.post('/register', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing. Make sure Content-Type is application/json' });
    }

    const { name, email, password } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    // Success
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// module.exports = router;
export default router;