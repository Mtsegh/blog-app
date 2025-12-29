import mongoose from "mongoose";

const topicsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    about: {
      type: String,
      required: true,
      maxlength: 400
    },

    coverImage: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Index for fast lookup
topicsSchema.index({ name: 1 });

const Topics = mongoose.model("Topics", topicsSchema);

export default Topics;