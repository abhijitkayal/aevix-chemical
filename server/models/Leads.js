// const mongoose = require("mongoose");
import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address:{
      type: String,
      required: true,
      trim: true,
    },
    state:{
      type: String,
      required: true,
      trim: true,
    },

    gstin: {
      type: String,
      trim: true,
      uppercase: true,
    },

    pan: {
      type: String,
      trim: true,
      uppercase: true,
    },

    placeOfSupply: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Lead", leadSchema);
export default mongoose.model("Lead", leadSchema);