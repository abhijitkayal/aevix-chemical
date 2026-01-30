import express from "express";
import multer from "multer";
import OutwardPayment from "../models/Outwardpayment.js";

const router = express.Router();

/* ================= MULTER CONFIG ================= */
// Using memoryStorage for Vercel serverless compatibility
// For production, consider using cloud storage (AWS S3, Cloudinary, Vercel Blob)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/* ================= CREATE OUTWARD PAYMENT ================= */
router.post("/", upload.single("attachment"), async (req, res) => {
  try {
    // For serverless: store file info or base64, not actual file
    // In production, upload to S3/Cloudinary and store URL
    const attachmentData = req.file ? {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      // Store as base64 (temporary solution - use cloud storage for production)
      data: req.file.buffer.toString('base64')
    } : null;

    const payment = await OutwardPayment.create({
      paymentNo: req.body.paymentNo,
      companyName: req.body.companyName,
      address: req.body.address,
      paymentDate: req.body.paymentDate,
      amount: req.body.amount,
      paymentType: req.body.paymentType,
      attachment: attachmentData ? JSON.stringify(attachmentData) : null,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* ================= GET ALL OUTWARD PAYMENTS ================= */
router.get("/", async (req, res) => {
  try {
    const payments = await OutwardPayment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

export default router;
