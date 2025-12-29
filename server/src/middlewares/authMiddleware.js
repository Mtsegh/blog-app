import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ message: "Unauthorised - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ message: "Unauthorised - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }

        req.user = user

        next()

    } catch (error) {
        // console.log("Error in protect middleware", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const optionalAuth = async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        // console.log("No token provided, continuing as guest");
        return next(); // no token — continue as a visitor
    }

    // const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("_id name email");
        req.user = user;
    } catch (err) {
        console.warn("Invalid or expired token, continuing as guest", err.message);
    }
    next();
};
