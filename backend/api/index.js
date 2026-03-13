import dotenv from "dotenv";
import app from "../app.js";
import { dbConnection } from "../db/dbConnect.js";

// ------- dotenv config ---------
dotenv.config();

// -------- Database connection ---------
dbConnection();

export default app
