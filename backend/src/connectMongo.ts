import mongoose from "mongoose";

export default async function connectMongo() {
    const uri = process.env.MONGO_URI!;
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected!");
    } catch (err) {
        console.error("Mongo connection error:", err);
        process.exit(1);
    }
}