import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { LeaveRequest } from "../models/LeaveRequest.js";
import { Employee } from "../models/Employee.js";
import type { AuthedRequest } from "../middlewares/auth.js";

const createLeaveSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime(),
  reason: z.string().max(500).optional()
});

export const myLeaves = asyncHandler(async (req: AuthedRequest, res) => {
  const userId = req.user!.userId;
  // userId -> user.employeeId mapping is done via User model; for MVP we query User each time OR store in JWT.
  // Keeping MVP simple: frontend passes employeeId; but we'll do better: read from user record.
  const user = await (await import("../models/User.js")).User.findById(userId).lean();
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const items = await LeaveRequest.find({ employeeId: user.employeeId }).sort({ createdAt: -1 }).lean();
  res.json({ items });
});

export const requestLeave = asyncHandler(async (req: AuthedRequest, res) => {
  const userId = req.user!.userId;
  const user = await (await import("../models/User.js")).User.findById(userId).lean();
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const emp = await Employee.findById(user.employeeId).lean();
  if (!emp) return res.status(400).json({ message: "Employee not found" });
  if (!emp.tlId) return res.status(400).json({ message: "No TL assigned for this employee" });

  const data = createLeaveSchema.parse(req.body);

  const doc = await LeaveRequest.create({
    employeeId: emp._id,
    approverTlId: emp.tlId,
    from: new Date(data.from),
    to: new Date(data.to),
    reason: data.reason ?? ""
  });

  res.status(201).json({ item: doc });
});

const decideSchema = z.object({
  id: z.string(),
  decision: z.enum(["APPROVED", "REJECTED"]),
  note: z.string().max(500).optional()
});

export const tlInbox = asyncHandler(async (req: AuthedRequest, res) => {
  const userId = req.user!.userId;
  const user = await (await import("../models/User.js")).User.findById(userId).lean();
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  // TL must have an employeeId to match approverTlId
  const items = await LeaveRequest.find({ approverTlId: user.employeeId, status: "PENDING" })
    .sort({ createdAt: -1 })
    .populate("employeeId", "employeeCode fullName teamType")
    .lean();

  res.json({ items });
});

export const tlDecide = asyncHandler(async (req: AuthedRequest, res) => {
  const userId = req.user!.userId;
  const user = await (await import("../models/User.js")).User.findById(userId).lean();
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { id, decision, note } = decideSchema.parse(req.body);

  const doc = await LeaveRequest.findOne({ _id: id, approverTlId: user.employeeId, status: "PENDING" });
  if (!doc) return res.status(404).json({ message: "Request not found" });

  doc.status = decision;
  doc.decisionNote = note ?? "";
  doc.decidedAt = new Date();
  await doc.save();

  res.json({ item: doc });
});