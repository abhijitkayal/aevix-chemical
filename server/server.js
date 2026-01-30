import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// Load environment variables from project root before other modules
import './loadEnv.js';
import warehouseRoutes from "./routes/WarehouseRoutes.js";
import invoiceRoutes from "./routes/InvoiceRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import inwardPaymentRoutes from "./routes/InwardpaymentRoutes.js"
import outwardPaymentRoutes from "./routes/OutwardpaymentRoutes.js";
import creditNoteRoutes from "./routes/CreditnoteRoutes.js";
import debitNoteRoutes from "./routes/DebitnoteRoutes.js";
import proformaRoutes from "./routes/ProformaRoutes.js";
import packingRoutes from "./routes/PackinglistRoutes.js";
import deliveryChallanRoutes from "./routes/DeliverychallanRoutes.js";
import quotationRoutes from "./routes/QuotationRoute.js";
import stockRoutes from "./routes/StockRoutes.js";
import jobworkRoutes from "./routes/JobworkRoutes.js";
import movementRoutes from "./routes/MovementRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import RoleRoutes from "./routes/RoleRoutes.js";
import leadsRoutes from "./routes/LeadRoutes.js";
import OrderAcknowledgement from "./routes/Orderacknowledgement.js";
import purchaseInvoiceRoutes from "./routes/PurchaseinvoiceRoutes.js";  
import authRoutes from './routes/AuthRoutes.js';
import clientRoutes from './routes/ClientRoutes.js';
import saleRoutes from './routes/SaleRoutes.js';
import CommissionRoutes from './routes/CommissionRoutes.js';
import profileRoutes from './routes/ProfileRoutes.js';
import batchRoutes from './routes/BatchRoutes.js';
const app = express();

// Configure CORS to allow Vercel frontend and other trusted origins
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL || 'https://aevix-chemical-frontend-theta.vercel.app',
  'https://aevix-chemical-mpbw.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin) return callback(null, true);
    // Allow explicit allowed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow any Vercel preview deployment (ends with .vercel.app)
    if (/\.vercel\.app$/.test(origin)) return callback(null, true);
    // Otherwise, block
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS and also handle preflight explicitly
app.use(cors(corsOptions));
// Use a RegExp path for OPTIONS to avoid path-to-regexp errors with '*' or '/*'
app.use(cors());

app.use(express.json());

mongoose
  .connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/aevix_chemical?retryWrites=true&w=majority&appName=HACKETHIC")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));


app.use('/api/auth', authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/purchase-invoices", purchaseInvoiceRoutes);
app.use("/api/warehouses", warehouseRoutes);

app.use("/api/products", productRoutes);
// Removed: app.use('/uploads', express.static('uploads')); 
// Files are now stored in memory/database for serverless compatibility

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
app.use("/api/order-acknowledgements",OrderAcknowledgement);
app.use("/api/clients", clientRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/commissions", CommissionRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/batches", batchRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
