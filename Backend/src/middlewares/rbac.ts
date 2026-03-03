import type { Response, NextFunction } from "express";
import type { AuthedRequest } from "./auth.js";

export function allowRoles(...roles: Array<"HR" | "TL" | "EMPLOYEE">) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}