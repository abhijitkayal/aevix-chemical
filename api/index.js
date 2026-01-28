import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import warehouseRoutes from "../server/routes/WarehouseRoutes.js";
import invoiceRoutes from "../server/routes/InvoiceRoutes.js";
import productRoutes from "../server/routes/ProductRoutes.js";
import inwardPaymentRoutes from "../server/routes/InwardpaymentRoutes.js"
import outwardPaymentRoutes from "../server/routes/OutwardpaymentRoutes.js";
import creditNoteRoutes from "../server/routes/CreditnoteRoutes.js";
import debitNoteRoutes from "../server/routes/DebitnoteRoutes.js";
import proformaRoutes from "../server/routes/ProformaRoutes.js";
import packingRoutes from "../server/routes/PackinglistRoutes.js";
import deliveryChallanRoutes from "../server/routes/DeliverychallanRoutes.js";
import quotationRoutes from "../server/routes/QuotationRoute.js";
import stockRoutes from "../server/routes/StockRoutes.js";
import jobworkRoutes from "../server/routes/JobworkRoutes.js";
import movementRoutes from "../server/routes/MovementRoutes.js";
import userRoutes from "../server/routes/UserRoutes.js";
import RoleRoutes from "../server/routes/RoleRoutes.js";
import leadsRoutes from "../server/routes/LeadRoutes.js";
import OrderAcknowledgement from "../server/routes/Orderacknowledgement.js";
import purchaseInvoiceRoutes from "../server/routes/PurchaseinvoiceRoutes.js";  
import authRoutes from '../server/routes/AuthRoutes.js';
import clientRoutes from '../server/routes/ClientRoutes.js';
import saleRoutes from '../server/routes/SaleRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/aevix_chemical?retryWrites=true&w=majority&appName=HACKETHIC"
  );

  cachedDb = db;
  return db;
}

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/purchase-invoices", purchaseInvoiceRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/products", productRoutes);
app.use('/api/inward-payments', inwardPaymentRoutes);
app.use("/api/outward-payments", outwardPaymentRoutes);
app.use("/api/credit-notes", creditNoteRoutes);
app.use("/api/debit-notes", debitNoteRoutes);
app.use("/api/proforma", proformaRoutes);
app.use("/api/packing-list", packingRoutes);
app.use("/api/delivery-challan", deliveryChallanRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/jobworks", jobworkRoutes);
app.use("/api/movements", movementRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", RoleRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/order-acknowledgements", OrderAcknowledgement);
app.use("/api/clients", clientRoutes);
app.use("/api/sales", saleRoutes);

// Health check for Vercel routing (works even when /api/* is rewritten to this handler)
app.get('/api/health', (req, res) => {
  console.log('[health] handler invoked', req.method, req.url);
  res.status(200).json({ ok: true, message: 'API is reachable', path: req.url });
});

// Export for Vercel serverless
export default async function handler(req, res) {
  console.log('[vercel] handler invoked', req.method, req.url);
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (err) {
    console.error('[vercel] handler error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
