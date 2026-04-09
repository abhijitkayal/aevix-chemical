// const mongoose = require('mongoose');
import mongoose from "mongoose";

const PurchaseInvoiceSchema = new mongoose.Schema(
  {
    vendorName: String,
    address: String,
    billingAddress: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    placeOfSupply: String,

    invoiceNo: String,
    invoiceDate: Date,
    challanNo: String,
    challanDate: Date,
    lrNo: String,
    deliveryMode: String,
    piNo: String,
    poNo: String,
    piDate: Date,
    validity: String,
    paymentTerm: String,
    deliveryTerm: String,
    freight: Number,
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    product: {
      productName: String,
      description: String,
      hsnCode: String,
      quantity: Number,
      unitPrice: Number,
    },
    shippingDetails: {
      shippingDate: Date,
      grossWeight: Number,
      netWeight: Number,
      shippingAddress: String,
      shippingNote: String,
    },
    totalAmount: Number,
  },
  { timestamps: true }
);

// module.exports = mongoose.model(
//   'PurchaseInvoice',
//   PurchaseInvoiceSchema
// );
export default mongoose.model('PurchaseInvoice', PurchaseInvoiceSchema);
// export default mongoose.model("Proforma", ProformaSchema);
