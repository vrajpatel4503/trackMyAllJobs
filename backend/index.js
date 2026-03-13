import dotenv from "dotenv";
import app from "./app.js";
import { dbConnection } from "./db/dbConnect.js";

// ------- dotenv config ---------
dotenv.config();

// -------- Database connection ---------
dbConnection();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
