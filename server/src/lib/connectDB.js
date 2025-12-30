import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongo_uri = process.env.MONGO_URI;
        const connected = await mongoose.connect(mongo_uri, {
            retryWrites: true,
            w: "majority",
        });
        console.log(`MongoDB connected: ${connected.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error: ", error); 
    }
}

export default connectDB;