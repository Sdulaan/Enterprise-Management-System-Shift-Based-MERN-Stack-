import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ShiftTemplate } from "../models/ShiftTemplate.js";

export const listShiftTemplates = asyncHandler(async (req, res) => {
  const teamType = String(req.query.teamType ?? "").trim();
  const filter: any = { active: true };
  if (teamType) filter.teamType = teamType;

  const items = await ShiftTemplate.find(filter).sort({ teamType: 1, start: 1 }).lean();
  res.json({ items });
});

const createSchema = z.object({
  teamType: z.enum(["FINANCE", "IT", "HR"]),
  name: z.string().min(2),
  start: z.string().regex(/^\d{2}:\d{2}$/),
  end: z.string().regex(/^\d{2}:\d{2}$/)
});

export const createShiftTemplate = asyncHandler(async (req, res) => {
  const data = createSchema.parse(req.body);
  const doc = await ShiftTemplate.create(data);
  res.status(201).json({ item: doc });
});