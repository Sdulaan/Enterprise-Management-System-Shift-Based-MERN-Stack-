import mongoose from "mongoose";

export type TeamType = "FINANCE" | "IT" | "HR";

const EmployeeSchema = new mongoose.Schema(
  {
    employeeCode: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, index: true },
    teamType: { type: String, enum: ["FINANCE", "IT", "HR"], required: true, index: true },
    tlId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null, index: true }, // TL who approves
    offDayWeekday: { type: Number, min: 0, max: 6, required: true }, // 0=Sun...6=Sat
    salary: {
      dayRate: { type: Number, required: true, min: 0 }
    },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE", index: true }
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", EmployeeSchema);