import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addComment, deleteComments, getComments } from "../controllers/comentController.js";

const router = express.Router();

router.get("/get-comments/:blogId", getComments);

// /api/comments/blog/:blogId
router.post("/add-comment/:blogId", protect, addComment);

// /api/comments/:id
router.delete("/delete/:commentId", protect, deleteComments);

export default router;
