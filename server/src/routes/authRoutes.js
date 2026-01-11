import express from "express";
import { checkAuth, forgotPassword, getUserProfile, getUsersWithPublishedBlogs, isBookmarked, login, logout, resendVerificationEmail, resetPassword, signup, toggleBookmarkStory, updateProfile, verifyEmail } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/signup", signup);

router.post("/login", login);

router.post("/verify", verifyEmail);

router.post("/signup", signup);

router.post("/logout", logout);

router.patch("/update-profile", protect, updateProfile);

router.get("/check", protect, checkAuth);

router.post("/resend-auth-email", resendVerificationEmail);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password/:token", resetPassword);

router.get("/get-authors", getUsersWithPublishedBlogs);

router.get("/authors/:userSlug", getUserProfile);

router.post("/bookmarks-stories", protect, toggleBookmarkStory);

router.get("/check-bookmark/:blogId", protect, isBookmarked);

export default router;