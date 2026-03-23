import mongoose from "mongoose";

const ProformaProductSchema = new mongoose.Schema(
  {
    productName: { type: String, trim: true },
    unit: { type: String, trim: true },
    description: { type: String, trim: true },
    hsnCode: { type: String, trim: true },
    quantity: { type: Number, default: 0, min: 0 },
    price: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const ProformaSchema = new mongoose.Schema(
  {
    customerName: String,
    billingAddress: String,
    shippingAddress: String,
    phone: String,
    gstin: String,
    placeOfSupply: String,

    proformaNo: String,
    proformaDate: String,
    validity: String,

    quotationNo: String,
    purchaseOrderNo: String,
    purchaseOrderDate: String,

    salesAccountName: String,

    challanNo: String,
    challanDate: String,
    lrNo: String,
    deliveryMode: String,

    products: {
      type: [ProformaProductSchema],
      default: [],
    },

    freightType: String,
    grossWeight: String,
    netWeight: String,
    totalPackages: String,
  },
  { timestamps: true }
);

export default mongoose.model("Proforma", ProformaSchema);
