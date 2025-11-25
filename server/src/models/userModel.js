import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
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
    username: {
        type: String,
        required: true,
        unique: [true, "Username is taken"]
    },
    subscribers: [String],
    profilePic: {
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
})

const User = mongoose.model("User", userSchema);

export default User;