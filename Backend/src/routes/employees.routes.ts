import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { allowRoles } from "../middlewares/rbac.js";
import { listEmployees, createEmployee } from "../controllers/employees.controller.js";

export const employeesRoutes = Router();
employeesRoutes.use(requireAuth);

employeesRoutes.get("/", allowRoles("HR", "TL"), listEmployees);
employeesRoutes.post("/", allowRoles("HR"), createEmployee);