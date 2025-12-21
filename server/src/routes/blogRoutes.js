import express from "express";
import { createBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogs, likeBlog, publish, searchBlogs } from "../controllers/blogController.js";
import { optionalAuth, protectRoute } from "../middlewares/authMiddleware.js";
import { getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/all-blogs", getAllBlogs);

router.get("/blog/:slug", getBlog);

router.get("/get-blogs", optionalAuth, getBlogs);

router.get("/search",  searchBlogs);

router.post("/create-blog", protectRoute,  createBlog);

router.put("/edit-blog", protectRoute,  editBlog);

router.get("/publish-blog/:slug", protectRoute,  publish);

router.get("/delete-blog/:slug", protectRoute,  deleteBlog);

router.get("/all-categories", protectRoute, getCategories);

router.patch("/:slug/like", likeBlog);

export default router;