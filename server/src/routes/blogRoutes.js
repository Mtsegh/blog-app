import express from "express";
import { createBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogs, likeBlog, publish, searchBlogs } from "../controllers/blogController.js";
import { optionalAuth, protect } from "../middlewares/authMiddleware.js";
import { addTopics, getCategories, getCategory } from "../controllers/topicsController.js";

const router = express.Router();

router.get("/all-blogs", getAllBlogs);

router.get("/blog/:slug", optionalAuth, getBlog);

router.get("/get-blogs", optionalAuth, getBlogs);

router.get("/search",  searchBlogs);

router.post("/create-blog", protect,  createBlog);

router.put("/edit-blog", protect,  editBlog);

router.get("/publish-blog/:slug", protect,  publish);

router.get("/delete-blog/:slug", protect,  deleteBlog);

router.get("/all-categories", getCategories);

router.get("/category/:slug", getCategory);

router.post("/create-topics", protect, addTopics);

router.patch("/:slug/like", likeBlog);

export default router;