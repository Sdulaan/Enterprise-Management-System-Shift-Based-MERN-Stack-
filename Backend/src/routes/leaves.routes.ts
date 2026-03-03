import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { allowRoles } from "../middlewares/rbac.js";
import { myLeaves, requestLeave, tlInbox, tlDecide } from "../controllers/leaves.controller.js";

export const leavesRoutes = Router();
leavesRoutes.use(requireAuth);

leavesRoutes.get("/mine", allowRoles("EMPLOYEE", "TL", "HR"), myLeaves);
leavesRoutes.post("/request", allowRoles("EMPLOYEE", "TL", "HR"), requestLeave);

leavesRoutes.get("/tl/inbox", allowRoles("TL"), tlInbox);
leavesRoutes.post("/tl/decide", allowRoles("TL"), tlDecide);