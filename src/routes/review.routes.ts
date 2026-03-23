import { Router } from "express";
import * as reviewController from '../controllers/review.controller'

const router = Router();

router.post("/", reviewController.createReview);
router.get("/paper/:paperId", reviewController.getReviewsByPaper);
router.get("/stats/:paperId", reviewController.getRatingStats);

export default router;