import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    role: String,
    employeeId: String,
    password: String, // plain password
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
