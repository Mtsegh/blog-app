import express from "express";
import { checkAuth, forgotPassword, login, logout, resendVerificationEmail, signup, updateProfilePic, verifyEmail } from "../controllers/userController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/signup", signup);

router.post("/login", login);

router.post("/verify", verifyEmail);

router.post("/signup", signup);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfilePic);

router.get("/check", protectRoute, checkAuth);

router.post("/resend-auth-email", resendVerificationEmail);

router.post("/forgot-password", forgotPassword);

export default router;