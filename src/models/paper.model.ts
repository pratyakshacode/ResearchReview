import mongoose, { Schema, Document } from "mongoose";

export interface PaperDocument extends Document {
  title: string;
  abstract: string;
  authors: string[];
  uploadedBy: mongoose.Types.ObjectId;
  fileUrl?: string;
  createdAt: Date;
}

const paperSchema = new Schema<PaperDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    authors: {
      type: [String],
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PaperModel = mongoose.model<PaperDocument>(
  "Paper",
  paperSchema
);