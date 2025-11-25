import { Blog } from "../models/blogModel.js";
import Comment from "../models/commentsModel.js";

// 🗨️ Create a comment
export const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { author, text } = req.body;

    if (!text) return res.status(400).json({ message: "Comment text is required" });

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = new Comment({ blogId, comment: text, author });
    await comment.save();
    
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding comment" });
  }
};

// 🧾 Get comments for a blog
export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 }); // latest first
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

export const deleteComments = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comments = await Comment.findOneAndDelete({ commentId }, { new: true }).sort({ createdAt: -1 }); // latest first
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching comments" });
  }
};
