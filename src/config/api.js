// API configuration
// In development, use localhost backend
// In production, use deployed backend on Vercel
const isDevelopment = import.meta.env.DEV;

export const API_URL = isDevelopment 
  ? (import.meta.env.VITE_API_URL || 'https://aevix-chemical-mpbw.vercel.app')
  : 'https://aevix-chemical-mpbw.vercel.app'; // Backend Vercel URL

export const API_ENDPOINTS = {
  invoices: `${API_URL}/api/invoices`,
  warehouses: `${API_URL}/api/warehouses`,
  products: `${API_URL}/api/products`,
  leads: `${API_URL}/api/leads`,
  profile: `${API_URL}/api/profile`,
  auth: `${API_URL}/api/auth`,
  // Add more as needed
};
