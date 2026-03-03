import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { api } from "./routes/index.js";
import { notFound, errorHandler } from "./middlewares/error.js";

export function createApp() {
  const app = express();

  const allowedOrigins = env.corsOrigin
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(helmet());

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true
    })
  );

  app.options("*", cors());

  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => res.json({ ok: true }));
  app.use("/api", api);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}