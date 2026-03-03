import mongoose from "mongoose";

const ShiftTemplateSchema = new mongoose.Schema(
  {
    teamType: { type: String, enum: ["FINANCE", "IT", "HR"], required: true, index: true },
    name: { type: String, required: true },
    start: { type: String, required: true }, // "08:00"
    end: { type: String, required: true },   // "16:00" (supports overnight logic later)
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const ShiftTemplate = mongoose.model("ShiftTemplate", ShiftTemplateSchema);