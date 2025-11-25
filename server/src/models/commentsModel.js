import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    comment: {
        type: String,        
        required: true
    },
    author: {
        type: String,        
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{ _id: false });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;