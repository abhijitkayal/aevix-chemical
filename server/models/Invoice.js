// import mongoose from "mongoose";

// const InvoiceSchema = new mongoose.Schema(
//   {
//     customer: String,
//     customerId: String,
//     warehouseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Warehouse",
//       required: true,
//     },
//     Warehouse:{
//       type:String,
//       // required:true,
//     },
//     productName: String,
//     quantity: Number,
//     rate: Number,
//     date: String,
//     dueDate: String,
//     notes: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Invoice", InvoiceSchema);


import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    /* ================= CUSTOMER DETAILS ================= */
    customer: {
      type: String,
      required: true,
      trim: true,
    },

    customerId: {
      type: String,
      required: true,
      trim: true,
    },

    phone: String,
    address: String,

    gstin: {
      type: String,
      uppercase: true,
    },

    pan: {
      type: String,
      uppercase: true,
    },

    state: String,

    placeOfSupply: String,

    invoiceNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      immutable: true,
    },

    invoiceSequence: {
      type: Number,
      required: true,
      min: 1,
      immutable: true,
    },

    /* ================= BANK DETAILS ================= */
    bankDetails: {
      bankName: String,
      accountNo: String,
      ifsc: String,
    },

    /* ================= WAREHOUSE & PRODUCT ================= */
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },

    products: [
      {
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unit: {
          type: String,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    freight: {
      type: Number,
      min: 0,
    },

    /* ================= DATES ================= */
    date: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      // required: true,
    },

    /* ================= PI/PO DETAILS ================= */
    piNumber: {
      type: String,
      trim: true,
    },

    poNumber: {
      type: String,
      trim: true,
    },

    piDate: {
      type: Date,
    },

    poDate: {
      type: Date,
    },

    /* ================= OTHER ================= */
    notes: String,

    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
      default: function () {
        if (this.products && this.products.length > 0) {
          const productTotal = this.products.reduce((sum, product) => {
            return sum + product.quantity * product.rate;
          }, 0);
          const legacyFreight = this.products.reduce((sum, product) => {
            return sum + (product.freight || 0);
          }, 0);

          return productTotal + (this.freight ?? legacyFreight);
        }
        return 0;
      },
    },
    shippingDetails: {
      shippingDate: {
        type: Date,
      },
      grossWeight: {
        type: String, // or Number if you prefer
        trim: true,
      },
      netWeight: {
        type: String, // or Number
        trim: true,
      },
      totalPackages: {
        type: String,
        trim: true,
      },
      shippingAddress: {
        type: String,
        trim: true,
      },
      additionalNote: {
        type: String,
        trim: true,
      },
    },
    driverDetails: {
  driverName: { type: String },
  driverPhone: { type: String },
  vehicleNo: { type: String },
  transportMode: {
    type: String,
    enum: ["Road", "Rail", "Air", "Sea"],
  },
},


    /* ================= PAYMENT DETAILS ================= */
    payment: {
      paymentDate: String,
      paymentType: String, // Cash / UPI / Bank / Cheque
      totalAmount: Number,
      paidAmount: Number,
      remainingAmount: Number,
      note: String,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
