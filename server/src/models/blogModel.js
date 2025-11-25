import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    author: {
        type: String,
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
    category: [String],
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
    publishedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true 
})

export const Blog = mongoose.model("Blog", blogSchema);