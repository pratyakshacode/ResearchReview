import mongoose from "mongoose";

export const connectDB = async () => {
  try {

    if(!process.env.MONGO_URI)throw new Error("Mongodb URI not found. Please provide valid mongodb connection string.")
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};