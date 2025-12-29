import { uploadToCloudinary } from "../utils/cloudinary.uploader.js";
import slugify from "slugify";
import Topics from "../models/topicsModel.js";

// 🗨️ Create a comment
export const addTopics = async (req, res) => {
  try {
    const { name, about, coverImage } = req.body;

    if (!name) return res.status(400).json({ message: "Topics name is required" });
    if (!about) return res.status(400).json({ message: "Topics description is required" });
    if (!coverImage) return res.status(400).json({ message: "Cover image is required" });

    const slug = slugify(name, { lower: true, strict: true });

    const existingTopics = await Topics.findOne({ slug });

    if (existingTopics) {
      return res.status(409).json({
        message: "Topic already exists"
      });
    }

    const coverImageLink = await uploadToCloudinary([coverImage], {folder: "category/content"});

    const newTopic = new Topics({ name, slug, about, coverImage: coverImageLink[0] });
    await newTopic.save();
    
    res.status(201).json({ message: "Topics added successfully", newTopic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding topics" });
  }
};

// 🧾 Get comments for a blog
export const getCategories = async (req, res) => {
  try {
    const categories = await Topics.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Topics.findOne({ slug });
    res.status(200).json(category);
  } catch (err) {
    console.error("Error fetching category:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComments = async (req, res) => {
  try {
    const { topicsId } = req.params;

    const categories = await Comment.findOneAndDelete({ topicsId }, { new: true }).sort({ createdAt: -1 }); // latest first
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTopics = async (req, res) => {
  try {
    const { topicsId } = req.params;
    const { name, about, coverImage } = req.body; 

    const topics = await Topics.findByIdAndUpdate(
      topicsId,
      { name, about, coverImage },
      { new: true }
    );

    if (!topics) {
      return res.status(404).json({ message: "Topics not found" });
    }

    res.status(200).json({ message: "Topics updated successfully", topics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersWithPublishedBlogs = async (req, res) => {
  try {
    const topics = await Blog.aggregate([
      {
        $match: { published: true }
      },
      {
        $group: {
          _id: "$category",
          publishedBlogs: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "topics",
          localField: "_id",
          foreignField: "_id",
          as: "topic"
        }
      },
      { $unwind: "$topic" },
      {
        $project: {
          _id: "$topic._id",
          name: "$topic.name",
          slug: "$topic.slug",
          about: "$topic.about",
          coverImage: "$topic.coverImage",
          publishedBlogs: 1
        }
      }
    ]);

    res.status(200).json({
      count: topics.length,
      topics
    });
  } catch (error) {
    console.error("Error fetching topics with published blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};