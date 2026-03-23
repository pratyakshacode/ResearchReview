import { ReviewModel } from "../models/review.model"; 
import "../models/user.model";

export const createReview = async (data: any) => {
  const { paperId, reviewerId } = data;

  // check if already reviewed
  const existing = await ReviewModel.findOne({
    paperId,
    reviewerId,
  });

  if (existing) {
    throw new Error("You have already reviewed this paper");
  }

  return await ReviewModel.create(data);
};

export const getReviewsByPaper = async (paperId: string) => {
  return await ReviewModel.find({ paperId })
    .populate("reviewerId", "name email")
    .sort({ createdAt: -1 });
};

export const getPaperRatingStats = async (paperId: string) => {
  const stats = await ReviewModel.aggregate([
    {
      $match: { paperId: new (require("mongoose").Types.ObjectId)(paperId) },
    },
    {
      $group: {
        _id: "$paperId",
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return stats[0] || { avgRating: 0, totalReviews: 0 };
};