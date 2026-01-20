// const express = require("express");
import express from "express";
const router = express.Router();
// const Lead = require("../models/Lead");
import Lead from "../models/Leads.js";

/* ================= CREATE LEAD ================= */
router.post("/", async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* ================= GET ALL / SEARCH LEADS ================= */
/*  /api/leads
    /api/leads?search=ra
*/
router.get("/", async (req, res) => {
  try {
    const search = req.query.search;

    let filter = {};
    if (search) {
      filter = {
        customerName: { $regex: search, $options: "i" },
      };
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= GET SINGLE LEAD ================= */
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= UPDATE LEAD ================= */
router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* ================= DELETE LEAD ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// module.exports = router;
export default router;
