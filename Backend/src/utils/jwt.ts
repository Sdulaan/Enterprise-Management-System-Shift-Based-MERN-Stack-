import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export type JwtPayload = { userId: string; role: "HR" | "TL" | "EMPLOYEE" };

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "8h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}