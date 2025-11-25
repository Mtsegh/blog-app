import { Blog } from "../models/blogModel.js";
import { Category } from "../models/categoryModel.js";

// 🗨️ Create a comment
export const addCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) return res.status(400).json({ message: "Category text is required" });

    const newCategory = new Category({ category });
    await newCategory.save();
    
    res.status(201).json({ message: "Category added successfully", newCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding category" });
  }
};

// 🧾 Get comments for a blog
export const getCategories = async (req, res) => {
  try {

    const categories = await Category.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComments = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const categories = await Comment.findOneAndDelete({ categoryId }, { new: true }).sort({ createdAt: -1 }); // latest first
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
