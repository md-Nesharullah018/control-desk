
import express from "express";
import { 
  register, 
  login, 
  requestPasswordOTP, 
  verifyOTP, 
  resetPassword, 
  deleteAccount 
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


router.post("/request-otp", requestPasswordOTP);  
router.post("/verify-otp", verifyOTP);              
router.post("/reset-password", resetPassword);         

router.post("/delete-account", deleteAccount);

export default router;