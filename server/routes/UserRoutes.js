import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* CREATE USER */
router.post("/", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body); // 👈 ADD THIS

    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.error("USER CREATE ERROR:", err); // 👈 ADD THIS
    res.status(400).json({
      message: err.message,
      error: err,
    });
  }
});

/* GET USERS */
router.get("/", async (req, res) => {
  const users = await User.find().select("-password"); // hide password
  res.json(users);
});

/* UPDATE USER */
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Do not overwrite password if empty
    if (!updateData.password) delete updateData.password;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* DELETE USER */
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
