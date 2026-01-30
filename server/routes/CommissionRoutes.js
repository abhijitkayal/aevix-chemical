// const express = require("express");
import express from "express";
const router = express.Router();
// const Commission = require("../models/Commission");
import Commission from "../models/Commission.js";

// CREATE
router.post("/", async (req, res) => {
  const data = await Commission.create(req.body);
  res.json(data);
});

// READ
router.get("/", async (req, res) => {
  const data = await Commission.find().sort({ createdAt: -1 });
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await Commission.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Commission.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// module.exports = router;
export default router;