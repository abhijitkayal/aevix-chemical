import express from "express";
import AuthUser from "../models/Authuser.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    let user = await AuthUser.findOne({ email });
    let userType = "authuser";

    if (!user) {
      user = await User.findOne({ email });
      userType = "user";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If role missing on found record (e.g. AuthUser), try finding a User doc with the same email and use its role
    let role = user.role || null;
    if (!role) {
      const other = await User.findOne({ email });
      if (other && other.role) role = other.role;
    }

    // Debug: log profile lookup
    console.log(`PROFILE: email=${email} userType=${userType} foundId=${user._id} userRole=${user.role || 'NONE'} resolvedRole=${role || 'NONE'}`);

    res.json({
      name: user.name,
      email: user.email,
      role,
      userType,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
