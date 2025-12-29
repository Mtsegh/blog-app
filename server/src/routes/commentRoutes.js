import express from "express";
import {
  addComment,
  getBlogComments,
  deleteComment
} from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/comments/blog/:blogId
router.get("/blog/:blogId", getBlogComments);

// /api/comments/blog/:blogId
router.post("/blog/:blogId", protect, addComment);

// /api/comments/:id
router.delete("/:id", protect, deleteComment);

export default router;
