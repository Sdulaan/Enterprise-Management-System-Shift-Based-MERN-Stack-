import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { employeesRoutes } from "./employees.routes.js";
import { leavesRoutes } from "./leaves.routes.js";
import { shiftsRoutes } from "./shifts.routes.js";

export const api = Router();
api.use("/auth", authRoutes);
api.use("/employees", employeesRoutes);
api.use("/leaves", leavesRoutes);
api.use("/shifts", shiftsRoutes);