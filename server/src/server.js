import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blogRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import subscribeRoutes from "./routes/subscribeRoute.js"
import connectDB from "./lib/connectDB.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/user", blogRoutes);
app.use("/api/comments", commentRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client/dist")));
    app.use((req, res) => {
    res.sendFile(
        path.resolve(__dirname, "../../client/dist/index.html")
    );
    });
}

const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
    connectDB();
})