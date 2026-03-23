import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "author" | "reviewer" | "admin";
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["author", "reviewer", "admin"],
      default: "author",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>(
  "User",
  userSchema
);