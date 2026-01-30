
// const mongoose = require("mongoose");
import mongoose from "mongoose";
const commissionSchema = new mongoose.Schema(
  {
    agentName: String,
    agentId: String,
    region: String,
    totalSales: Number,
    rate: Number,
    commission: Number,
    tds: Number,
    netPayable: Number,
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Commission", commissionSchema);
export default mongoose.model("Commission", commissionSchema);