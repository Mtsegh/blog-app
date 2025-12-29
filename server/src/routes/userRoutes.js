import express from "express";
import {
  getUserProfile,
  updateProfile
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:userSlug", getUserProfile);

router.put("/profile/image", protect, updateProfile);

export default router;
