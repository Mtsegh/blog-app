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
    if (comment) await comment.save();
    
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

    const comments = await Comment.find({ blogId })
    .sort({ createdAt: -1 })
    .populate("author", "_id userSlug fullname profileImage")
    .lean(); // latest first

    const no_of_comments = await Comment.countDocuments({ blogId });
    res.status(200).json({ comments, no_of_comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

export const deleteComments = async (req, res) => {
  try {
    const { commentId } = req.params;

    await Comment.findOneAndDelete({ _id: commentId });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
