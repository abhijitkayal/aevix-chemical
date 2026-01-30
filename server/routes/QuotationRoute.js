// // const express = require("express");
// // const router = express.Router();
// // const Quotation = require("../models/Quotation");
// import express from "express";
// import Quotation from "../models/Quotation.js";
// const router = express.Router();
// /* CREATE */
// router.post("/", async (req, res) => {
//   try {
//     const quotation = await Quotation.create(req.body);
//     res.status(201).json(quotation);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// /* READ ALL */
// router.get("/", async (req, res) => {
//   const quotations = await Quotation.find().sort({ createdAt: -1 });
//   res.json(quotations);
// });

// export default router;


// const express = require("express");
// const router = express.Router();
// const Quotation = require("../models/Quotation");
import express from "express";
import Quotation from "../models/Quotation.js";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);
    res.status(201).json(quotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= READ ALL ================= */
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.json(quotations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= READ ONE (OPTIONAL) ================= */
router.get("/:id", async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json(quotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= UPDATE (EDIT) ================= */
router.put("/:id", async (req, res) => {
  try {
    const updatedQuotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return updated document
        runValidators: true,
      },
    );

    if (!updatedQuotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json(updatedQuotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedQuotation = await Quotation.findByIdAndDelete(req.params.id);

    if (!deletedQuotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.json({ message: "Quotation deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;