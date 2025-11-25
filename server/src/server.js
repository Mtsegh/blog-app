import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blogRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import subscribeRoutes from "./routes/subscribeRoute.js"
import connectDB from "./lib/connectDB.js";

dotenv.config()
const app = express()

app.use(
    cors({
        origin: "http://localhost:5173",//http://localhost:5173
        credentials: true,
    })
);

app.use(express.json({ limit: "100mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/blogs", blogRoutes);
const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
    connectDB();
})