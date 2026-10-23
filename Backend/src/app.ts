import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Importing all Routes...
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "success", 
    message: "Server is live",
    timestamp: new Date().toISOString()
  });
});

// import userRouter from "./routes/user.routes.ts";
// import urlRouter from "./routes/url.routes.ts";

// // Routes Decleration....
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/urls", urlRouter);

export { app };