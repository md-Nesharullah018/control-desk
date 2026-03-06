import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

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

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});