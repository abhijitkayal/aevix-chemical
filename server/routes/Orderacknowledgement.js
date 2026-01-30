// const express = require("express");
import express from "express";
import sgMail from '@sendgrid/mail';
import PDFDocument from 'pdfkit';
const router = express.Router();
// const OrderAck = require("../models/OrderAcknowledgement");
import OrderAck from "../models/Orderacknowledgement.js";

/* CREATE */
router.post("/", async (req, res) => {
  try {
    // Auto-generate OA number
    const count = await OrderAck.countDocuments();
    const oaNumber = `OA${String(count + 1).padStart(4, '0')}`;
    
    const oa = new OrderAck({
      ...req.body,
      oaNumber
    });
    await oa.save();
    res.status(201).json(oa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  const data = await OrderAck.find().sort({ createdAt: -1 });
  res.json(data);
});

/* GET ONE */
router.get("/:id", async (req, res) => {
  const data = await OrderAck.findById(req.params.id);
  res.json(data);
});

/* SEND ORDER ACKNOWLEDGEMENT VIA EMAIL */
router.post("/:id/send-email", async (req, res) => {
  try {
    const { to, cc, bcc, subject, message } = req.body;
    
    console.log('>>> Send OA Email - Request received for ID:', req.params.id);
    console.log('>>> Send OA Email - Recipient:', to);
    
    const oa = await OrderAck.findById(req.params.id);

    if (!oa) {
      console.error('>>> Order Acknowledgement not found:', req.params.id);
      return res.status(404).json({ message: "Order Acknowledgement not found" });
    }

    console.log('>>> Send OA Email - OA found:', oa.oaNumber);

    // Generate PDF as buffer
    console.log('>>> Send OA Email - Generating PDF...');
    const pdfBuffer = await generateOrderAckPDF(oa);
    console.log('>>> Send OA Email - PDF generated, size:', pdfBuffer.length);

    // Prepare email using SendGrid
    console.log('>>> Send OA Email - Preparing SendGrid...');
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }
    if (!process.env.EMAIL_FROM) {
      throw new Error('EMAIL_FROM is not configured');
    }
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const emailContent = {
      to: to,
      from: process.env.EMAIL_FROM,
      subject: subject || `Order Acknowledgement ${oa.oaNumber} from Aevix Chemical`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Acknowledgement ${oa.oaNumber}</h2>
          <p>${message || 'Please find attached your order acknowledgement.'}</p>
          
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 5px 0;"><strong>Buyer:</strong> ${oa.buyer?.name || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(oa.shippingDetails?.orderDate || oa.createdAt).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Total Items:</strong> ${oa.items?.length || 0}</p>
          </div>
          
          <p style="margin-top: 20px;">Thank you for your business!</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
          <p style="color: #888; font-size: 11px;">This is an automated email from Aevix Chemical Management System.</p>
        </div>
      `,
      attachments: [
        {
          content: pdfBuffer.toString('base64'),
          filename: `OrderAck-${oa.oaNumber}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };

    // Add CC and BCC if provided
    if (cc) emailContent.cc = cc;
    if (bcc) emailContent.bcc = bcc;

    await sgMail.send(emailContent);

    console.log('>>> Send OA Email - Email sent successfully to:', to);

    res.json({ 
      success: true, 
      message: "Email sent successfully to " + to + " with PDF attachment"
    });

  } catch (error) {
    console.error(">>> Send OA Email Error:", error);
    console.error(">>> Error details:", error.response?.body?.errors || error.message);
    res.status(500).json({ 
      message: "Failed to send email", 
      error: error.response?.body?.errors?.[0]?.message || error.message,
      details: error.toString()
    });
  }
});

// Helper function to generate Order Acknowledgement PDF as buffer
const generateOrderAckPDF = async (oa) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    
    try {
      // Header
      doc.font("Helvetica-Bold").fontSize(18).text("AEVIX CHEMICAL", 40, 40);
      doc.font("Helvetica").fontSize(9).text(
        "158 Lenin Sarani, 2nd Floor\nRoom No. 6/2B\nKolkata, West Bengal - 700013",
        40, 65
      );

      doc.font("Helvetica-Bold").fontSize(16).text("ORDER ACKNOWLEDGEMENT", 0, 120, { align: "center" });
      
      // OA Details
      doc.font("Helvetica").fontSize(10);
      doc.text(`OA Number: ${oa.oaNumber}`, 40, 160);
      doc.text(`Date: ${new Date(oa.shippingDetails?.orderDate || oa.createdAt).toLocaleDateString()}`, 40, 175);
      
      // Buyer Details
      doc.font("Helvetica-Bold").fontSize(12).text("Buyer Details:", 40, 200);
      doc.font("Helvetica").fontSize(10);
      doc.text(`Name: ${oa.buyer?.name || 'N/A'}`, 40, 220);
      doc.text(`Address: ${oa.buyer?.address || 'N/A'}`, 40, 235);
      doc.text(`GST: ${oa.buyer?.gst || 'N/A'}`, 40, 250);
      doc.text(`Shipping Address: ${oa.shippingAddress || 'N/A'}`, 40, 265);
      
      // Items Table Header
      let yPos = 300;
      doc.font("Helvetica-Bold").fontSize(10);
      doc.text("Product", 40, yPos);
      doc.text("HSN", 250, yPos);
      doc.text("Qty", 320, yPos);
      doc.text("Rate", 380, yPos);
      doc.text("GST", 440, yPos);
      doc.text("Total", 490, yPos);
      
      yPos += 20;
      doc.moveTo(40, yPos).lineTo(550, yPos).stroke();
      
      // Items
      doc.font("Helvetica").fontSize(9);
      let grandTotal = 0;
      if (oa.items && oa.items.length > 0) {
        oa.items.forEach((item) => {
          yPos += 15;
          if (yPos > 700) {
            doc.addPage();
            yPos = 50;
          }
          doc.text(item.productName || 'N/A', 40, yPos, { width: 200 });
          doc.text(item.hsn || 'N/A', 250, yPos);
          doc.text(item.quantity || 0, 320, yPos);
          doc.text(`₹${item.unitPrice || 0}`, 380, yPos);
          doc.text(`₹${item.gstAmount || 0}`, 440, yPos);
          doc.text(`₹${item.totalAmount || 0}`, 490, yPos);
          grandTotal += item.totalAmount || 0;
        });
      }
      
      yPos += 25;
      doc.moveTo(40, yPos).lineTo(550, yPos).stroke();
      
      // Total
      yPos += 15;
      doc.font("Helvetica-Bold").fontSize(11);
      doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 380, yPos);
      
      // Footer
      yPos += 50;
      doc.font("Helvetica").fontSize(9);
      doc.text("Terms & Conditions:", 40, yPos);
      yPos += 15;
      doc.text("1. Payment terms as agreed", 40, yPos);
      yPos += 12;
      doc.text("2. Delivery as per schedule", 40, yPos);
      
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// module.exports = router;
export default router;