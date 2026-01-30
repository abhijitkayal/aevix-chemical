import express from "express";
import Proforma from "../models/Proforma.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  const proforma = await Proforma.create(req.body);
  res.json(proforma);
});

/* READ */
router.get("/", async (req, res) => {
  const data = await Proforma.find().sort({ createdAt: -1 });
  res.json(data);
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const updated = await Proforma.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Proforma.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
