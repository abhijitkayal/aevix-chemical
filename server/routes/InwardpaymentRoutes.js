// const express = require('express');
// const multer = require('multer');
// const InwardPayment = require('../models/InwardPayment');
import express from "express";
import multer from "multer";
import InwardPayment from "../models/Inwardpayment.js";
import path from 'path';
import fs from 'fs';

const router = express.Router();

/* FILE UPLOAD - Using memoryStorage for Vercel serverless compatibility */
// Note: For production, consider using cloud storage (AWS S3, Cloudinary, Vercel Blob)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/* CREATE PAYMENT */
router.post('/', upload.single('attachment'), async (req, res) => {
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

    const payment = await InwardPayment.create({
      receiptNo: req.body.receiptNo,
      companyName: req.body.companyName,
      address: req.body.address,
      paymentDate: req.body.paymentDate,
      amount: req.body.amount,
      paymentType: req.body.paymentType,
      attachment: attachmentData ? JSON.stringify(attachmentData) : null,
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* GET ALL PAYMENTS */
router.get('/', async (req, res) => {
  const payments = await InwardPayment.find().sort({ createdAt: -1 });
  res.json(payments);
});

export default router;
