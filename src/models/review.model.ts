import mongoose, { Schema, Document } from "mongoose";

export interface ReviewDocument extends Document {
  paperId: mongoose.Types.ObjectId;
  reviewerId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    paperId: {
      type: Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model<ReviewDocument>(
  "Review",
  reviewSchema
);