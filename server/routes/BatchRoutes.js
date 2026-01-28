import express from "express";
import Batch from "../models/Batch.js";
import Warehouse from "../models/Warehouse.js";
import Product from "../models/Product.js";

const router = express.Router();
// GET latest batches
router.get("/", async (req, res) => {
  const batches = await Batch.find()
    .populate("warehouseId")
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(batches);
});


/* ================= CREATE BATCH ================= */
router.post("/", async (req, res) => {
  try {
    const { batchNo, productName, warehouseId, materials } = req.body;

    // Validate request
    if (!Array.isArray(materials) || materials.length === 0) {
      return res.status(400).json({ message: "Materials array is required" });
    }

    // Load warehouse and validate
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const warehouseMaterials = Array.isArray(warehouse.materials) ? warehouse.materials : [];
    console.log("Warehouse Materials:", warehouseMaterials);

    // Helper to normalize names
    const normalize = (s) => (s || "").toString().trim().toLowerCase();

    // First pass: check missing/insufficient before mutating
    const missing = [];
    const insufficient = [];

    // Track updates to apply after validation
    const warehouseUpdates = []; // { stock, reqQty, reqBags }
    const productUpdates = []; // { product, reqQty }

    // Escapes user-supplied string for safe regex
    const escapeRegex = (s) => (s || "").toString().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    for (const m of materials) {
      const reqName = normalize(m.materialName);
      const reqQty = Number(m.quantity) || 0;
      const reqBags = Number(m.bags) || 0;

      // Prefer warehouse materials if present
      const stock = warehouseMaterials.find((x) => normalize(x.materialName) === reqName);

      if (stock) {
        if (stock.quantity < reqQty || stock.bags < reqBags) {
          insufficient.push({
            material: m.materialName,
            source: "warehouse",
            availableQty: stock.quantity,
            requestedQty: reqQty,
            availableBags: stock.bags,
            requestedBags: reqBags,
          });
        } else {
          warehouseUpdates.push({ stock, reqQty, reqBags });
        }

        continue;
      }

      // If not in warehouse materials, check Product collection for the material in same warehouse
      const product = await Product.findOne({
        warehouseId,
        productName: { $regex: `^${escapeRegex(m.materialName || "")}$$`, $options: "i" },
      });

      if (product) {
        if (product.quantity < reqQty) {
          insufficient.push({
            material: m.materialName,
            source: "product",
            availableQty: product.quantity,
            requestedQty: reqQty,
          });
        } else {
          productUpdates.push({ product, reqQty });
        }

        continue;
      }

      // Not found in either place
      missing.push(m.materialName);
    }

    if (missing.length > 0) {
      return res.status(400).json({ message: "Some materials not found in warehouse or products", missing, availableInWarehouse: warehouseMaterials.map((x) => x.materialName) });
    }

    if (insufficient.length > 0) {
      return res.status(400).json({ message: "Insufficient stock for some materials", insufficient });
    }

    // Apply updates now that all checks passed
    for (const u of warehouseUpdates) {
      u.stock.quantity -= u.reqQty;
      u.stock.bags -= u.reqBags;
    }

    for (const u of productUpdates) {
      u.product.quantity -= u.reqQty;
      await u.product.save();
    }

    await warehouse.save();

    // Save batch after stock is successfully adjusted
    const batch = await Batch.create({
      batchNo,
      productName,
      warehouseId,
      materials,
    });

    res.status(201).json(batch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
