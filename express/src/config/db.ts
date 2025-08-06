import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to db");
});

pool.on("error", () => {
  console.log("Error in db connection");
  process.exit(1);
});

export default pool;
