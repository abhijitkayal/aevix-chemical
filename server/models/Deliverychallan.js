// import mongoose from "mongoose";

// const DeliveryChallanSchema = new mongoose.Schema(
//   {
//     /* Customer Info */
//     supplyType: { type: String, enum: ["Outward", "Inward"], default: "Outward" },
//     customerName: { type: String, required: true },
//     address: String,
//     contactPerson: String,
//     phone: String,
//     gstin: String,
//     // reverseCharge: { type: String, default: "No" },
//     shippingSame: { type: Boolean, default: true },
//     placeOfSupply: String,

//     /* Delivery Challan Detail */
//     // type: String,
//     challanPrefix: String,
//     challanNo: { type: String, required: true },
//     challanPostfix: String,
//     challanDate: String,
//     lrNo: String,
//     ewayNo: String,
//     ewayReason: String,
//     deliveryMode: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("DeliveryChallan", DeliveryChallanSchema);



import mongoose from "mongoose";

const deliveryChallanSchema = new mongoose.Schema(
  {
    supplyType: String,

    customerName: String,
    address: String,
    shippingAddress: String,
    state: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    placeOfSupply: String,

    productName: String,
    quantity: Number,

    challanPrefix: String,
    challanNo: String,
    challanPostfix: String,
    challanDate: Date,

    lrNo: String,
    ewayNo: String,
    ewayReason: String,
    deliveryMode: String,
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryChallan", deliveryChallanSchema);
