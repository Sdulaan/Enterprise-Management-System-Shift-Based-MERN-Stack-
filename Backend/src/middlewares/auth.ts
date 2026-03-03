import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export type AuthedRequest = Request & { user?: { userId: string; role: "HR" | "TL" | "EMPLOYEE" } };

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}