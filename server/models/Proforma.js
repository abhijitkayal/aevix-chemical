import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.model("Proforma", ProformaSchema);
