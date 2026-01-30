// // const express = require("express");
// import express from "express";
// const router = express.Router();
// // const Lead = require("../models/Lead");
// import Lead from "../models/Leads.js";

// /* ================= CREATE LEAD ================= */
// router.post("/", async (req, res) => {
//   try {
//     const lead = await Lead.create(req.body);
//     res.status(201).json(lead);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// /* ================= GET ALL / SEARCH LEADS ================= */
// /*  /api/leads
//     /api/leads?search=ra
// */
// router.get("/", async (req, res) => {
//   try {
//     const search = req.query.search;

//     let filter = {};
//     if (search) {
//       filter = {
//         customerName: { $regex: search, $options: "i" },
//       };
//     }

//     const leads = await Lead.find(filter).sort({ createdAt: -1 });
//     res.status(200).json(leads);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* ================= GET SINGLE LEAD ================= */
// router.get("/:id", async (req, res) => {
//   try {
//     const lead = await Lead.findById(req.params.id);
//     if (!lead) {
//       return res.status(404).json({ message: "Lead not found" });
//     }
//     res.status(200).json(lead);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* ================= UPDATE LEAD ================= */
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedLead = await Lead.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedLead) {
//       return res.status(404).json({ message: "Lead not found" });
//     }

//     res.status(200).json(updatedLead);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// /* ================= DELETE LEAD ================= */
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedLead = await Lead.findByIdAndDelete(req.params.id);

//     if (!deletedLead) {
//       return res.status(404).json({ message: "Lead not found" });
//     }

//     res.status(200).json({ message: "Lead deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // module.exports = router;
// export default router;



import express from "express";
import Lead from "../models/Leads.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerId,
      phone,
      address,
      state,
      gstin,
      pan,
      placeOfSupply,
      reminderDate,
      reminderNote,
    } = req.body;

    // REQUIRED FIELDS
    if (!customerName || !customerId || !phone || !placeOfSupply) {
      return res.status(400).json({
        success: false,
        message: "customerName, customerId, phone and placeOfSupply are required",
      });
    }

    // If date is selected, reminder note must exist
    if (reminderDate && !reminderNote) {
      return res.status(400).json({
        success: false,
        message: "Reminder note is required when date is selected",
      });
    }

    const lead = await Lead.create({
      customerName,
      customerId,
      phone,
      address,
      state,
      gstin,
      pan,
      placeOfSupply,
      reminderDate: reminderDate || null,
      reminderNote: reminderNote || "",
    });

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (err) {
    console.error("CREATE LEAD ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


/* GET ALL / SEARCH */
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
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
