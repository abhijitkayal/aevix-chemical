import express from "express";
import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";
import Stock from "../models/Stock.js";
import Warehouse from "../models/Warehouse.js";
import Client from "../models/Client.js";
import { generateInvoicePDF, generateInvoicePDFBuffer } from "../utils/Invoicepdf.js";
import { sendOtpMail } from "../utils/mailer.js";
import sgMail from '@sendgrid/mail';
import PDFDocument from 'pdfkit';

const router = express.Router();

/* ======================
   GET ALL INVOICES
====================== */
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("warehouseId", "warehouse")
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch invoices",
      error: err.message,
    });
  }
});

/* ======================
   DOWNLOAD INVOICE PDF
====================== */
// router.get("/:id/download", async (req, res) => {
//   try {
//     const invoice = await Invoice.findById(req.params.id)
//       .populate("warehouseId");

//     if (!invoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }

//     generateInvoicePDF(invoice, res);
//   } catch (err) {
//     if (!res.headersSent) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// });




router.get("/:id/download", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const pdfBuffer = await generateInvoicePDF(invoice); // your existing logic

    const isPreview = req.query.preview === "true";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      isPreview
        ? "inline; filename=invoice.pdf"
        : "attachment; filename=invoice.pdf"
    );

    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ message: "PDF generation failed" });
  }
});

/* ================= CUSTOMER LEDGER ================= */
router.get("/ledger", async (req, res) => {
  try {
    const { customer, from, to } = req.query;

    if (!customer) {
      return res.status(400).json({ message: "Customer is required" });
    }

    const filter = {
      customer: { $regex: customer, $options: "i" }, // recommended search support
    };

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const invoices = await Invoice.find(filter).sort({ date: 1 });

    res.json(invoices);
  } catch (error) {
    console.error("Ledger Error:", error);
    res.status(500).json({
      message: "Ledger fetch failed",
      error: error.message,
    });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("warehouseId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


/* ======================
   CREATE INVOICE
====================== */
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      warehouseId,
      productName,
      quantity,
    } = req.body;

    /* ======================
       1️⃣ BASIC VALIDATION
    ====================== */
    if (!warehouseId || !productName || !quantity) {
      return res.status(400).json({
        message: "warehouseId, productName and quantity are required",
      });
    }

    /* ======================
       2️⃣ PRODUCT STOCK CHECK
    ====================== */
    const product = await Product.findOne({
      warehouseId,
      productName,
    });

    if (!product) {
      return res.status(404).json({
        message: `Product "${productName}" not found in this warehouse`,
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${product.quantity}, Requested: ${quantity}`,
      });
    }

    /* ======================
       3️⃣ FIND CLIENT (OPTIONAL)
    ====================== */
    const client = await Client.findOne({
      clientName: customer,
    });

    /* ======================
       4️⃣ LEDGER CHECK (ONLY IF CLIENT EXISTS)
    ====================== */
  

    /* ======================
       5️⃣ CREATE INVOICE
    ====================== */
    const invoice = await Invoice.create(req.body);

    /* ======================
       6️⃣ UPDATE PRODUCT STOCK (ALWAYS)
    ====================== */
    product.quantity -= quantity;
    await product.save();

    /* ======================
       6️⃣-B UPDATE STOCK COLLECTION (FOR NOTIFICATIONS)
    ====================== */
    // Try to find and update the corresponding stock item
    const stockItem = await Stock.findOne({ 
      itemName: { $regex: new RegExp(productName, 'i') }
    });

    if (stockItem) {
      stockItem.currentStock -= quantity;
      
      // Recalculate status based on new stock level
      let status = "Good";
      if (stockItem.currentStock <= stockItem.reorderLevel * 0.5) {
        status = "Critical";
      } else if (stockItem.currentStock <= stockItem.reorderLevel) {
        status = "Low";
      }
      stockItem.status = status;
      
      await stockItem.save();
    }

    /* ======================
       7️⃣ UPDATE CLIENT LEDGER (ONLY IF FOUND)
    ====================== */
    let ledgerUpdate = null;

    if (client) {
      client.totalQuantity -= quantity;
      await client.save();

      ledgerUpdate = {
        clientName: client.clientName,
        remainingQuantity: client.totalQuantity,
      };
    }

    /* ======================
       8️⃣ UPDATE WAREHOUSE TOTAL
    ====================== */
    const warehouse = await Warehouse.findById(warehouseId);
    if (warehouse) {
      const products = await Product.find({ warehouseId });
      warehouse.totalItems = products.reduce(
        (sum, p) => sum + p.quantity,
        0
      );
      await warehouse.save();
    }

    /* ======================
       9️⃣ RESPONSE
    ====================== */
    res.status(201).json({
      message: "Invoice created successfully",
      invoice,
      updates: {
        product: {
          productName: product.productName,
          remainingQuantity: product.quantity,
        },
        ledger: ledgerUpdate, // null if client not found
      },
    });

  } catch (err) {
    res.status(500).json({
      message: "Invoice creation failed",
      error: err.message,
    });
  }
});

/* ======================
   UPDATE INVOICE PAYMENT
====================== */
router.put("/:id/payment", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      paymentDate,
      paymentType,
      totalAmount,
      paidAmount,
      remainingAmount,
      note,
    } = req.body;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.payment = {
      paymentDate,
      paymentType,
      totalAmount,
      paidAmount,
      remainingAmount,
      note,
    };

    await invoice.save();

    res.json({
      message: "Payment updated successfully",
      payment: invoice.payment,
    });
  } catch (error) {
    console.error("Payment update error:", error);
    res.status(500).json({
      message: "Server error while updating payment",
      error: error.message,
    });
  }
});
/* ======================
   UPDATE INVOICE
====================== */
router.put("/:id", async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error("Invoice update error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
/* ================= CUSTOMER LEDGER ================= */
router.get("/ledger", async (req, res) => {
  try {
    const { customer } = req.query;

    if (!customer) {
      return res.status(400).json({ message: "Customer is required" });
    }

    // Trim and normalize incoming query params
    const rawCustomer = (req.query.customer || "").trim();
    const rawFrom = (req.query.from || "").trim();
    const rawTo = (req.query.to || "").trim();

    console.info("Ledger request:", { customer: rawCustomer, from: rawFrom, to: rawTo });

    if (!rawCustomer) {
      return res.status(400).json({ message: "Customer is required" });
    }

    // ✅ CONTAINS search (handles space, case, partial typing)
    const filter = {
      customer: { $regex: rawCustomer, $options: "i" },
    };

    // Only parse dates when non-empty
    if (rawFrom || rawTo) {
      const fromDate = rawFrom ? new Date(rawFrom) : null;
      const toDate = rawTo ? new Date(rawTo) : null;

      if ((rawFrom && isNaN(fromDate.getTime())) || (rawTo && isNaN(toDate.getTime()))) {
        return res.status(400).json({ message: "Invalid date format for 'from' or 'to'. Use YYYY-MM-DD." });
      }

      if (fromDate) filter.date = { ...(filter.date || {}), $gte: fromDate };
      if (toDate) {
        toDate.setHours(23, 59, 59, 999);
        filter.date = { ...(filter.date || {}), $lte: toDate };
      }
    }

    console.debug("Ledger filter:", filter);

    let invoices;
    try {
      invoices = await Invoice.find(filter).sort({ date: 1 }).lean();
    } catch (dbErr) {
      console.error("Ledger DB query error:", dbErr);
      return res.status(500).json({ message: "Ledger DB query error", error: dbErr.message });
    }

    // Sanitize dates for the client to avoid mixed types
    const sanitized = invoices.map((inv) => {
      if (inv && inv.date) {
        if (typeof inv.date === "string") {
          const parsed = new Date(inv.date);
          inv.date = isNaN(parsed.getTime()) ? inv.date : parsed.toISOString();
        } else if (inv.date instanceof Date) {
          inv.date = inv.date.toISOString();
        }
      }
      return inv;
    });

    console.info(`Ledger: found ${sanitized.length} invoices`);

    // Check serialization before sending (catches circular/unsupported values)
    try {
      JSON.stringify(sanitized);
    } catch (serErr) {
      console.error("Ledger serialization error:", serErr);
      return res.status(500).json({ message: "Ledger serialization error", error: serErr.message });
    }

    res.json(sanitized);
  } catch (error) {
    console.error("Ledger Error:", error);
    res.status(500).json({ message: "Ledger fetch failed" });
  }
});

/* ======================
   SEND INVOICE VIA WHATSAPP
====================== */
router.post("/:id/send-whatsapp", async (req, res) => {
  try {
    const { mobile, message } = req.body;
    const invoice = await Invoice.findById(req.params.id).populate("warehouseId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Generate PDF buffer using the new function
    const pdfBuffer = await generateInvoicePDFBuffer(invoice);

    // Convert to base64
    const pdfBase64 = pdfBuffer.toString('base64');
    
    // WhatsApp message text
    const messageText = message || `Invoice ${invoice.invoiceNo}\nCustomer: ${invoice.customer}\nTotal: ₹${invoice.totalAmount}\n\nThank you for your business!`;
    const encodedMessage = encodeURIComponent(messageText);
    
    // Generate WhatsApp link
    const whatsappLink = `https://wa.me/${mobile.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

    // Return PDF data and WhatsApp link
    res.json({ 
      success: true, 
      message: "WhatsApp ready to send",
      link: whatsappLink,
      pdfData: pdfBase64,
      fileName: `Invoice-${invoice.invoiceNo}.pdf`,
      note: "PDF generated. Use WhatsApp Web API or save PDF and attach manually."
    });

  } catch (error) {
    console.error("WhatsApp Send Error:", error);
    res.status(500).json({ message: "Failed to send WhatsApp", error: error.message });
  }
});

/* ======================
   SEND INVOICE VIA EMAIL
====================== */
router.post("/:id/send-email", async (req, res) => {
  try {
    const { to, cc, bcc, subject, message } = req.body;
    const invoice = await Invoice.findById(req.params.id).populate("warehouseId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Generate PDF buffer using the new function
    const pdfBuffer = await generateInvoicePDFBuffer(invoice);

    // Prepare email using SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const emailContent = {
      to: to,
      from: process.env.EMAIL_FROM,
      subject: subject || `Invoice ${invoice.invoiceNo} from Aevix Chemical`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Invoice ${invoice.invoiceNo}</h2>
          <p>${message || 'Please find attached your invoice.'}</p>
          
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 5px 0;"><strong>Customer:</strong> ${invoice.customer}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Total Amount:</strong> ₹${invoice.totalAmount}</p>
          </div>
          
          <p style="margin-top: 20px;">Thank you for your business!</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
          <p style="color: #888; font-size: 11px;">This is an automated email from Aevix Chemical Management System.</p>
        </div>
      `,
      attachments: [
        {
          content: pdfBuffer.toString('base64'),
          filename: `Invoice-${invoice.invoiceNo}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };

    // Add CC and BCC if provided
    if (cc) emailContent.cc = cc;
    if (bcc) emailContent.bcc = bcc;

    await sgMail.send(emailContent);

    res.json({ 
      success: true, 
      message: "Email sent successfully to " + to + " with PDF attachment"
    });

  } catch (error) {
    console.error("Email Send Error:", error);
    res.status(500).json({ 
      message: "Failed to send email", 
      error: error.response?.body?.errors?.[0]?.message || error.message 
    });
  }
});






export default router;
