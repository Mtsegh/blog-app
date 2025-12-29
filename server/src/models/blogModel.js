import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topics",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    htmlContent: {
        type: String
    },
    excerpt: {
        type: String
    },
    coverImage: {
        type: String
    },
    tags: [String],
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    published: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true 
})

blogSchema.index({ author: 1, published: 1 });
blogSchema.index({ category: 1, published: 1 });
blogSchema.index({ published: 1, publishedAt: -1 });

export const Blog = mongoose.model("Blog", blogSchema);