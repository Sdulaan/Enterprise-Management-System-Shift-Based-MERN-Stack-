import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";
import { verifyPassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await User.findOne({ email }).lean();
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = signToken({ userId: String(user._id), role: user.role });
  return res.json({ token, role: user.role });
});