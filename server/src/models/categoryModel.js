import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        unique: true
    },
});

export const Category = mongoose.model("Category", categorySchema);