import mongoose from "mongoose";

const batchMaterialSchema = new mongoose.Schema({
  materialName: String,
  quantity: Number,
  bags: Number,
});

const batchSchema = new mongoose.Schema(
  {
    batchNo: String,
    productName: String,
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    materials: [batchMaterialSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Batch", batchSchema);
