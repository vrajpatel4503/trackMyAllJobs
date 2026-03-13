import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

// ----- Routes import -----
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";

const app = express();

// ==================== middleware =======================

app.use(compression());

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://trackmyalljobs.vercel.app",
];

// CORS configuration
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// -------- Routes declaration ---------
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("TrackMyAllJobs API is running...");
});

export default app;