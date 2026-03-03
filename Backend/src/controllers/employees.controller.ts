import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../models/Employee.js";

const createSchema = z.object({
  employeeCode: z.string().min(2),
  fullName: z.string().min(2),
  teamType: z.enum(["FINANCE", "IT", "HR"]),
  tlId: z.string().nullable().optional(),
  offDayWeekday: z.number().int().min(0).max(6),
  dayRate: z.number().min(0)
});

export const listEmployees = asyncHandler(async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  const teamType = String(req.query.teamType ?? "").trim();
  const filter: any = { status: "ACTIVE" };

  if (q) filter.$or = [{ fullName: new RegExp(q, "i") }, { employeeCode: new RegExp(q, "i") }];
  if (teamType) filter.teamType = teamType;

  const items = await Employee.find(filter).sort({ fullName: 1 }).limit(200).lean();
  res.json({ items });
});

export const createEmployee = asyncHandler(async (req, res) => {
  const data = createSchema.parse(req.body);
  const doc = await Employee.create({
    employeeCode: data.employeeCode,
    fullName: data.fullName,
    teamType: data.teamType,
    tlId: data.tlId ?? null,
    offDayWeekday: data.offDayWeekday,
    salary: { dayRate: data.dayRate }
  });
  res.status(201).json({ item: doc });
});