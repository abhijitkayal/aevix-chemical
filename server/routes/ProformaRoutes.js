import express from "express";
import Proforma from "../models/Proforma.js";

const router = express.Router();

const sanitizeProducts = (products = []) => {
  if (!Array.isArray(products)) return [];

  return products
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      productName: String(item.productName || "").trim(),
      unit: String(item.unit || "").trim(),
      description: String(item.description || "").trim(),
      hsnCode: String(item.hsnCode || "").trim(),
      quantity: Number(item.quantity) || 0,
      price: Number(item.price) || 0,
    }))
    .filter(
      (item) =>
        item.productName ||
        item.unit ||
        item.description ||
        item.hsnCode ||
        item.quantity ||
        item.price
    );
};

const buildPayload = (body = {}) => ({
  ...body,
  products: sanitizeProducts(body.products),
  freightType: String(body.freightType || "").trim(),
  grossWeight: String(body.grossWeight || "").trim(),
  netWeight: String(body.netWeight || "").trim(),
  totalPackages: String(body.totalPackages || "").trim(),
});

/* CREATE */
router.post("/", async (req, res) => {
  const proforma = await Proforma.create(buildPayload(req.body));
  res.json(proforma);
});

/* READ */
router.get("/", async (req, res) => {
  const data = await Proforma.find().sort({ createdAt: -1 });
  res.json(data);
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const updated = await Proforma.findByIdAndUpdate(
    req.params.id,
    buildPayload(req.body),
    { new: true }
  );
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Proforma.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
