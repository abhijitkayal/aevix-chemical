// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://aevix-chemical-4-9p3j.onrender.com';

export const API_ENDPOINTS = {
  invoices: `${API_URL}/api/invoices`,
  warehouses: `${API_URL}/api/warehouses`,
  products: `${API_URL}/api/products`,
  leads: `${API_URL}/api/leads`,
  profile: `${API_URL}/api/profile`,
  auth: `${API_URL}/api/auth`,
  // Add more as needed
};
