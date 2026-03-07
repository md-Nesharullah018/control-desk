import express from "express";
import cors from "cors";
import ServerlessHttp from "serverless-http";
import { config } from "dotenv";
import { connectDB } from "../config/db.js"; // Correct: goes up to backend/config
import authRoutes from "../routes/authRoutes.js"; // Correct: goes up to backend/routes

config();

const app = express();

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auth_app";
connectDB(mongoURI);

app.use(cors()); 
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running perfectly! 🚀");
});

export default app;
export const handler = ServerlessHttp(app);