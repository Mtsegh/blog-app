import express from "express";
import { addCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/all-categories", getCategories);



export default router;