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

const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_PRODUCTION,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// -------- Routes declaration ---------
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

export default app;
