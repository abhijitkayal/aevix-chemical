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

    res.json({
      name: user.name,
      email: user.email,
      userType,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
