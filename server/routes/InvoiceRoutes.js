import express from "express";
import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";
import Stock from "../models/Stock.js";
import Warehouse from "../models/Warehouse.js";
import Client from "../models/Client.js";
import { generateInvoicePDF } from "../utils/Invoicepdf.js";

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
router.get("/:id/download", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("warehouseId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    generateInvoicePDF(invoice, res);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ message: err.message });
    }
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


export default router;
