import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    subscribers: {}
});

export const Category = mongoose.model("Category", categorySchema);