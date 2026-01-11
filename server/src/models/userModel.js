import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: [40, "Bio cannot exceed 40 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already registered"]
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        maxlength: [400, "Bio cannot exceed 150 characters"]
    },
    userSlug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    savedStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }],
    likedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }],
    profileImage: {
        type: String,
        default: "https://res.cloudinary.com/dz0sija7a/image/upload/v1766826956/user/content/ixfquskbh7cbu6z7emte.jpg"
    },
    coverImage: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
	resetPasswordExpiresAt: Date,
	verificationToken: String,
	verificationTokenExpiresAt: Date,
}, { timestamps: true });

userSchema.index({ likedBlogs: 1 });

const User = mongoose.model("User", userSchema);

export default User;