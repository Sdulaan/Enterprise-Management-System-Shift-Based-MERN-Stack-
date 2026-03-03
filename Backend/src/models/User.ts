import mongoose from "mongoose";

export type Role = "HR" | "TL" | "EMPLOYEE";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["HR", "TL", "EMPLOYEE"], required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);