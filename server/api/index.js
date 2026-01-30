// Vercel serverless entry point for backend
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import all routes
import warehouseRoutes from "../routes/WarehouseRoutes.js";
import invoiceRoutes from "../routes/InvoiceRoutes.js";
import productRoutes from "../routes/ProductRoutes.js";
import inwardPaymentRoutes from "../routes/InwardpaymentRoutes.js";
import outwardPaymentRoutes from "../routes/OutwardpaymentRoutes.js";
import creditNoteRoutes from "../routes/CreditnoteRoutes.js";
import debitNoteRoutes from "../routes/DebitnoteRoutes.js";
import proformaRoutes from "../routes/ProformaRoutes.js";
import packingRoutes from "../routes/PackinglistRoutes.js";
import deliveryChallanRoutes from "../routes/DeliverychallanRoutes.js";
import quotationRoutes from "../routes/QuotationRoute.js";
import stockRoutes from "../routes/StockRoutes.js";
import jobworkRoutes from "../routes/JobworkRoutes.js";
import movementRoutes from "../routes/MovementRoutes.js";
import userRoutes from "../routes/UserRoutes.js";
import RoleRoutes from "../routes/RoleRoutes.js";
import leadsRoutes from "../routes/LeadRoutes.js";
import OrderAcknowledgement from "../routes/Orderacknowledgement.js";
import purchaseInvoiceRoutes from "../routes/PurchaseinvoiceRoutes.js";
import authRoutes from '../routes/AuthRoutes.js';
import clientRoutes from '../routes/ClientRoutes.js';
import saleRoutes from '../routes/SaleRoutes.js';
import CommissionRoutes from '../routes/CommissionRoutes.js';
import profileRoutes from '../routes/ProfileRoutes.js';
import batchRoutes from '../routes/BatchRoutes.js';

const app = express();

// Configure CORS
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
  console.log('>>> Connecting to MongoDB...', mongoUri ? 'URI exists' : 'No URI');
  
  const db = await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 30000, // 30 seconds for cold starts
    socketTimeoutMS: 45000,
  });

  cachedDb = db;
  console.log('>>> MongoDB Connected successfully');
  return db;
}

// Mount all routes
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
  res.json({ 
    ok: true, 
    message: 'Backend API is running on Vercel', 
    timestamp: new Date().toISOString() 
  });
});

// Health check endpoint (no DB required)
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Backend API is running on Vercel', 
    timestamp: new Date().toISOString(),
    mongodb: cachedDb ? 'connected' : 'not connected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Aevix Chemical API Server',
    version: '1.0.0',
    endpoints: '/api/*',
    health: '/api/health'
  });
});

// Export for Vercel serverless
export default async function handler(req, res) {
  try {
    // Skip DB connection for health check
    if (req.url === '/api/health' || req.url === '/') {
      return app(req, res);
    }
    
    // Connect to DB for other routes
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('>>> Serverless handler error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
