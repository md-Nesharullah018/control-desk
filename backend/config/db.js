import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/auth_app");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("Mongo Error:", err.message);
    process.exit(1);
  }
};