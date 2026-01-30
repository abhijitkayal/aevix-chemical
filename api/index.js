// Load environment variables FIRST
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try loading from server/.env first, then ../.env
try {
  const serverEnvPath = join(__dirname, '..', 'server', '.env');
  dotenv.config({ path: serverEnvPath });
  console.log('>>> api/index.js: Loaded .env from server/');
} catch (err) {
  dotenv.config({ path: join(__dirname, '..', '.env') });
  console.log('>>> api/index.js: Loaded .env from root');
}

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
import CommissionRoutes from '../server/routes/CommissionRoutes.js';
import profileRoutes from '../server/routes/ProfileRoutes.js';
import batchRoutes from '../server/routes/BatchRoutes.js';

const app = express();

// Configure CORS for Vercel
const allowedOrigins = [
  'http://localhost:5173',
  'https://aevix-chemical-mpbw.vercel.app',
  process.env.FRONTEND_URL || 'https://aevix-chemical-frontend-theta.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log('>>> Using cached MongoDB connection');
    return cachedDb;
  }

  const mongoUri = process.env.MONGO_URI || "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/aevix_chemical?retryWrites=true&w=majority&appName=HACKETHIC";
  console.log('>>> Connecting to MongoDB...');
  
  const db = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });

  cachedDb = db;
  console.log('>>> MongoDB Connected');
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
app.use('/api/commissions', CommissionRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/batches', batchRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API is running on Vercel', timestamp: new Date().toISOString() });
});

// Export for Vercel serverless
export default async function handler(req, res) {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('>>> Serverless handler error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
