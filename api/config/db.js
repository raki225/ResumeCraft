import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/resumexpert";
    await mongoose.connect(uri)
        .then(() => console.log("DB CONNECTED"))
        .catch(err => console.log("DB Connection Error:", err));
}
