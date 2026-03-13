
import express from "express";
const router = express.Router();
import PurchaseInvoice from '../models/PurchaseInvoice.js';

// Create
router.post('/', async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.create(req.body);
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create purchase invoice', error: err.message });
  }
});

// Get all
router.get('/', async (req, res) => {
  try {
    const invoices = await PurchaseInvoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch purchase invoices', error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await PurchaseInvoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Purchase invoice not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update purchase invoice', error: err.message });
  }
});

export default router;
