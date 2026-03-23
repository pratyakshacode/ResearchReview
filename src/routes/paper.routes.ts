import { Router } from "express";
import * as paperController from "../controllers/paper.controller";
import { upload } from "../utils/multer";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, upload.single("file"), paperController.uploadPaper);
router.get("/", paperController.getAllPapers);
router.get("/:id", paperController.getPaperById);

export default router;