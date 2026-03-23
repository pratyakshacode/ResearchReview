import { Request, Response } from "express";
import * as reviewService from '../services/review.service'

export const createReview = async (req: any, res: Response) => {
  try {
    const { paperId, rating, comment } = req.body;
    const reviewerId = req?.user?._id;

    if (!paperId || !reviewerId || !rating || !comment) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const review = await reviewService.createReview({
      paperId,
      reviewerId,
      rating,
      comment,
    });

    return res.status(201).json(review);
  } catch (error: any) {
    if (error.message === "You have already reviewed this paper") {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Error creating review" });
  }
};

export const getReviewsByPaper = async (req: Request, res: Response) => {
  try {
    const { paperId } = req.params;

    const reviews = await reviewService.getReviewsByPaper(paperId as string);

    return res.json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching reviews" });
  }
};

export const getRatingStats = async (req: Request, res: Response) => {
  try {
    const { paperId } = req.params;

    const stats = await reviewService.getPaperRatingStats(paperId as string);

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rating stats" });
  }
};