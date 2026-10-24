import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const isOriginAllowed = (origin?: string): boolean => {
  if (!origin) return true;

  const cleanOrigin = origin.trim().replace(/\/$/, "");

  // Always allow Cloudflare Pages production and preview domains
  if (
    cleanOrigin === "https://silver-pixel-soft.pages.dev" ||
    cleanOrigin.endsWith(".pages.dev")
  ) {
    return true;
  }

  // Always allow local development ports
  if (/^http:\/\/localhost(:\d+)?$/.test(cleanOrigin)) {
    return true;
  }

  const corsEnv = process.env.CORS_ORIGIN || "*";
  if (corsEnv === "*") return true;

  const allowedOrigins = corsEnv.split(",").map((o) => o.trim().replace(/\/$/, ""));
  return allowedOrigins.includes(cleanOrigin) || allowedOrigins.includes("*");
};

app.use(cors({
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
}));

// Handle Chrome Private Network Access preflights
app.use((req, res, next) => {
  if (req.headers["access-control-request-private-network"]) {
    res.setHeader("Access-Control-Allow-Private-Network", "true");
  }
  next();
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Importing all Routes...
app.get("/api/v1/health", (req, res) => {
  res.json({ 
    status: "success", 
    message: "Server is live",
    timestamp: new Date().toISOString()
  });
});

import {router as aiRouter} from "./routes/ai.routes.ts";

// Routes Decleration....
app.use("/api/v1/ai", aiRouter);

// Global Error Handler Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || []
  });
});

export { app };