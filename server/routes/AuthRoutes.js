// import express from 'express';
// const router = express.Router();
// import AuthUser from '../models/Authuser.js';
// import User from '../models/User.js'
// import transporter from "../utils/mailer.js";

// /* ======================
//    TEST ENDPOINT
// ====================== */
// router.get('/test', (req, res) => {
//   res.json({ message: 'Auth routes working!' });
// });

// router.post('/test-body', (req, res) => {
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);
//   res.json({ 
//     message: 'Body test', 
//     receivedBody: req.body,
//     contentType: req.headers['content-type']
//   });
// });

// /* ======================
//    LOGIN WITH EMAIL
// ====================== */
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Validate input
// //     if (!email || !password) {
// //       return res.status(400).json({
// //         message: "Email and password required",
// //       });
// //     }

// //     /* ======================
// //        1️⃣ Check AuthUser
// //     ====================== */
// //     let user = await AuthUser.findOne({ email });

// //     /* ======================
// //        2️⃣ If not found, check User
// //     ====================== */
// //     let userType = "authuser";

// //     if (!user) {
// //       user = await User.findOne({ email });
// //       userType = "user";
// //     }

// //     /* ======================
// //        3️⃣ If not found in BOTH
// //     ====================== */
// //     if (!user) {
// //       return res.status(401).json({
// //         message: "User not found",
// //       });
// //     }

// //     /* ======================
// //        4️⃣ Check password
// //     ====================== */
// //     if (user.password !== password) {
// //       return res.status(401).json({
// //         message: "Invalid password",
// //       });
// //     }

// //     /* ======================
// //        5️⃣ LOGIN SUCCESS
// //     ====================== */
// //     // Prefer role from the found user; if missing (e.g. AuthUser), check User collection for the role
// //     let role = user.role;
// //     if (!role) {
// //       try {
// //         const other = await User.findOne({ email });
// //         if (other && other.role) role = other.role;
// //       } catch (e) {
// //         // ignore
// //       }
// //     }

// //     // Debug: log resolution for role
// //     console.log(`LOGIN: email=${email} userType=${userType} foundId=${user._id} userRole=${user.role || 'NONE'} resolvedRole=${role || 'NONE'}`);

// //     res.json({
// //       message: "Login successful",
// //       userType, // "authuser" or "user"
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: role || "N/A",
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({
// //       message: "Server error",
// //       error: err.message,
// //     });
// //   }
// // });


// router.post("/login", async (req, res) => {
//   try {
//     console.log('Login request body:', req.body);
//     const { email, password } = req.body || {};

//     // Basic validation
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password required' });
//     }

//     let user = await AuthUser.findOne({ email }) || await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     // 🔐 Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Attach OTP and expiry (update using updateOne so we don't trigger full document validation)
//     const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//     try {
//       // Attempt to update in both collections; one of them will match
//       const [authRes, userRes] = await Promise.all([
//         AuthUser.updateOne({ _id: user._id }, { $set: { otp, otpExpiry } }),
//         User.updateOne({ _id: user._id }, { $set: { otp, otpExpiry } }),
//       ]);

//       // Optional debug — warn if no document was matched
//       const matched = (authRes && (authRes.matchedCount || authRes.n || authRes.modifiedCount)) || (userRes && (userRes.matchedCount || userRes.n || userRes.modifiedCount));
//       if (!matched) {
//         console.warn('OTP update did not match any document for user', user._id);
//       }
//     } catch (saveErr) {
//       console.error('Error saving user during login (updateOne):', saveErr);
//       return res.status(500).json({ message: 'Failed to update user for OTP', error: saveErr.message, name: saveErr.name });
//     }

//     // ✉️ Send OTP email (handle SMTP errors separately so client gets useful info)
//     try {
//       await transporter.sendMail({
//         from: `"Aevix Chemical" <${process.env.EMAIL_USER}>`,
//         to: user.email,
//         subject: "Your Login OTP",
//         html: `
//           <h2>Login Verification</h2>
//           <p>Your OTP is:</p>
//           <h1>${otp}</h1>
//           <p>Valid for 5 minutes</p>
//         `,
//       });
//     } catch (mailErr) {
//       // Log detailed error info for hosting provider logs (do not leak sensitive info to clients)
//       console.error('sendMail error: ', {
//         message: mailErr && mailErr.message,
//         code: mailErr && mailErr.code,
//         response: mailErr && mailErr.response,
//         stack: mailErr && mailErr.stack,
//       });
//       return res.status(500).json({ message: 'Failed to send OTP email', error: mailErr && mailErr.message ? mailErr.message : 'Unknown error' });
//     }

//     res.json({
//       message: "OTP sent to email",
//       otpRequired: true,
//       userId: user._id,
//     });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });
// router.post("/verify-otp", async (req, res) => {
//   try {
//     const { userId, otp } = req.body || {};

//     if (!userId || !otp) {
//       return res.status(400).json({ message: 'userId and otp required' });
//     }

//     const user = await AuthUser.findById(userId) || await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const storedOtp = user.otp ? String(user.otp).trim() : null;
//     const providedOtp = String(otp).trim();
//     const now = Date.now();
//     const expiry = user.otpExpiry ? new Date(user.otpExpiry).getTime() : null;

//     if (process.env.NODE_ENV !== 'production') {
//       console.log('verify-otp debug:', { userId, storedOtp, providedOtp, expiry, now, expired: expiry && expiry < now });
//     }

//     if (!storedOtp || storedOtp !== providedOtp) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     if (!expiry || expiry < now) {
//       return res.status(400).json({ message: 'OTP expired' });
//     }

//     // Clear OTP using updateOne to avoid full document validation errors
//     await Promise.all([
//       AuthUser.updateOne({ _id: user._id }, { $unset: { otp: 1, otpExpiry: 1 } }),
//       User.updateOne({ _id: user._id }, { $unset: { otp: 1, otpExpiry: 1 } }),
//     ]);

//     res.json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error('verify-otp error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });



// /* ======================
//    REGISTER NEW USER
// ====================== */
// router.post('/register', async (req, res) => {
//   try {
//     console.log('Request body:', req.body);
    
//     if (!req.body) {
//       return res.status(400).json({ message: 'Request body is missing. Make sure Content-Type is application/json' });
//     }

//     const { name, email, password } = req.body;

//     // Validate
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Name, email and password required' });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       password
//     });

//     await newUser.save();

//     // Success
//     res.status(201).json({
//       message: 'User registered successfully',
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email
//       }
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // module.exports = router;
// export default router;

import express from "express";
import AuthUser from "../models/Authuser.js";
import UserModel from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendOtpMail } from "../utils/mailer.js";

const router = express.Router();

/* ======================
   LOGIN → SEND OTP
====================== */
router.post("/login", async (req, res) => {
  console.log('=== LOGIN REQUEST RECEIVED ===');
  try {
    console.log('Login attempt for:', req.body?.email);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password required' });
    }

    console.log('Looking up user in both UserModel and AuthUser schemas...');
    const userFromUserModel = await UserModel.findOne({ email });
    const userFromAuthUser = await AuthUser.findOne({ email });
    
    if (!userFromUserModel && !userFromAuthUser) {
      console.log('User not found in either schema:', email);
      return res.status(401).json({ message: "User not found" });
    }

    // Check password in UserModel first, then AuthUser
    let user = null;
    if (userFromUserModel && userFromUserModel.password === password) {
      user = userFromUserModel;
      console.log('User authenticated from UserModel');
    } else if (userFromAuthUser && userFromAuthUser.password === password) {
      user = userFromAuthUser;
      console.log('User authenticated from AuthUser');
    } else {
      console.log('Invalid password for:', email);
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log('Password correct, generating OTP...');
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP for', email, ':', otp);

    console.log('Deleting old OTPs...');
    // Remove old OTPs
    await Otp.deleteMany({ email });

    console.log('Saving new OTP to database...');
    // Save OTP
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });
    console.log('OTP saved to database for', email);

    // Send Email
    try {
      console.log('Attempting to send email to:', email);
      const { sendOtpMail } = await import('../utils/mailer.js');
      console.log('Mailer module imported, calling sendOtpMail...');
      await sendOtpMail(email, otp);
      console.log('Email sent successfully to:', email);
    } catch (mailErr) {
      console.error('!!! MAIL ERROR !!!');
      console.error('Failed to send OTP email:', mailErr?.message || mailErr);
      console.error('Full mail error:', mailErr);
      return res.status(500).json({ 
        message: 'Failed to send OTP email', 
        error: mailErr?.message || 'Email service error',
        debug: process.env.NODE_ENV !== 'production' ? { otp } : undefined
      });
    }

    console.log('Login successful, returning response');
    res.json({
      message: "OTP sent to email",
      email,
    });

  } catch (err) {
    console.error('!!! LOGIN ERROR !!!');
    console.error('Login error:', err);
    console.error('Error stack:', err?.stack);
    res.status(500).json({ message: "Server error", error: err?.message || 'Unknown error' });
  }
});

/* ======================
   VERIFY OTP
====================== */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log('=== VERIFY OTP REQUEST ===');
    console.log('Email:', email);
    console.log('OTP received:', otp, 'Type:', typeof otp);

    // Convert OTP to string for comparison
    const otpString = String(otp).trim();
    console.log('OTP as string:', otpString);

    const record = await Otp.findOne({ email });
    console.log('OTP record from DB:', record);
    
    if (!record) {
      console.log('No OTP record found for email:', email);
      return res.status(400).json({ message: "Invalid OTP or OTP expired" });
    }

    const storedOtp = String(record.otp).trim();
    console.log('Stored OTP:', storedOtp, 'Matches:', storedOtp === otpString);

    if (storedOtp !== otpString) {
      console.log('OTP mismatch!');
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      console.log('OTP expired');
      return res.status(400).json({ message: "OTP expired" });
    }

    // OTP valid → login success
    await Otp.deleteMany({ email });
    console.log('OTP validated successfully');

    // Check both schemas for user data
    const userFromUserModel = await UserModel.findOne({ email });
    const userFromAuthUser = await AuthUser.findOne({ email });
    const user = userFromUserModel || userFromAuthUser;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });

  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   RESEND OTP (no password required)
====================== */
router.post('/resend-otp', async (req, res) => {
  try {
    console.log('=== RESEND OTP REQUEST ===');
    const { email } = req.body || {};
    console.log('Email:', email);
    
    if (!email) return res.status(400).json({ message: 'Email required' });

    // Check both schemas
    const userFromUserModel = await UserModel.findOne({ email });
    const userFromAuthUser = await AuthUser.findOne({ email });
    const user = userFromUserModel || userFromAuthUser;
    
    if (!user) {
      console.log('User not found in either schema:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found in:', userFromUserModel ? 'UserModel' : 'AuthUser');
    console.log('Generating new OTP...');
    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);
    
    await Otp.deleteMany({ email });
    console.log('Old OTPs deleted');
    
    await Otp.create({ email, otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
    console.log('New OTP saved to database');

    // Send email
    try {
      await sendOtpMail(email, otp);
      console.log('OTP email sent successfully');
    } catch (mailErr) {
      console.error('Failed to send OTP email:', mailErr);
      return res.status(500).json({ 
        message: 'Failed to send OTP email', 
        error: mailErr?.message || 'Email service error',
        debug: process.env.NODE_ENV !== 'production' ? { otp } : undefined
      });
    }

    res.json({ message: 'OTP resent to email' });
  } catch (err) {
    console.error('resend-otp error:', err);
    res.status(500).json({ message: 'Server error', error: err?.message });
  }
});

export default router;


