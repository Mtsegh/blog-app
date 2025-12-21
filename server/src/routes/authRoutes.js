import express from "express";
import { checkAuth, forgotPassword, login, logout, resendVerificationEmail, resetPassword, signup, updateProfile, verifyEmail } from "../controllers/userController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/signup", signup);

router.post("/login", login);

router.post("/verify", verifyEmail);

router.post("/signup", signup);

router.post("/logout", logout);

router.patch("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

router.post("/resend-auth-email", resendVerificationEmail);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password/:token", resetPassword);

export default router;