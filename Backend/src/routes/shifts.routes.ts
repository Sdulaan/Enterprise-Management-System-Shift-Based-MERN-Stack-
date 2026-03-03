import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { allowRoles } from "../middlewares/rbac.js";
import { listShiftTemplates, createShiftTemplate } from "../controllers/shifts.controller.js";

export const shiftsRoutes = Router();
shiftsRoutes.use(requireAuth);

shiftsRoutes.get("/templates", allowRoles("HR", "TL", "EMPLOYEE"), listShiftTemplates);
shiftsRoutes.post("/templates", allowRoles("HR"), createShiftTemplate);