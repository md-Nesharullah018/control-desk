

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email: email.toLowerCase(), password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

// LOGIN 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ 
      message: "Login successful", 
      token, 
      name: user.name, 
      email: user.email 
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// REQUEST OTP

export const requestPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000; 
    await user.save();

    await sendEmail(user.email, otp);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// VERIFY OTP 
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOtp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.resetOtp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Unauthorized reset attempt" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated!" });
  } catch (err) {
    res.status(500).json({ message: "Reset failed" });
  }
};

//DELETE ACCOUNT 
export const deleteAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    await User.findByIdAndDelete(user._id);
    res.status(200).json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};