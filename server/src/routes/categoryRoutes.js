import express from "express";
import {
  createTopics,
  getCategories,
  getTopicsWithBlogs
} from "../controllers/topics.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCategories);               // categories + blogCount
router.get("/:slug", getTopicsWithBlogs);   // topics + blogs
router.post("/", protect, adminOnly, createTopics);

export default router;
