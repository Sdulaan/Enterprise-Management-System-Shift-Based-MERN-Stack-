import mongoose from "mongoose";

const LeaveRequestSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true, index: true },
    approverTlId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true, index: true },
    from: { type: Date, required: true, index: true },
    to: { type: Date, required: true },
    reason: { type: String, default: "" },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING", index: true },
    decisionNote: { type: String, default: "" },
    decidedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

LeaveRequestSchema.index({ employeeId: 1, from: 1 });

export const LeaveRequest = mongoose.model("LeaveRequest", LeaveRequestSchema);