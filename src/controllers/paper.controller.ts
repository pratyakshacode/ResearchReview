import { Request, Response } from "express";
import * as paperService from '../services/paper.service'
import { logger } from "../utils/logger";

export const createPaper = async (req: Request, res: Response) => {
  try {
    const { title, abstract, authors, uploadedBy } = req.body;

    if (!title || !abstract || !authors || !uploadedBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const paper = await paperService.createPaper({
      title,
      abstract,
      authors,
      uploadedBy,
    });

    res.status(201).json(paper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating paper" });
  }
};

export const getAllPapers = async (req: Request, res: Response) => {
  try {
    const papers = await paperService.getAllPapers();
    res.json(papers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching papers" });
  }
};

export const getPaperById = async (req: Request, res: Response) => {
  try {
    const paper = await paperService.getPaperById(req.params.id as string);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.json(paper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching paper" });
  }
};

export const uploadPaper = async (req: any, res: Response) => {
  try {

    logger.info("Uploading the file");
    const file = req.file;

    logger.info("File recieved : " + file);

    if (!file) {
        logger.error("There is no file recieved from the request. Returning bad request.")
        return res.status(400).json({ message: "PDF file is required" });
    }

    const { title, abstract, authors } = req.body;
    const uploadedBy = req.user._id;

    if (!title || !abstract || !authors || !uploadedBy) {
        logger.info("Missing field found. Returning bad request");
        return res.status(400).json({ message: "Missing fields" });
    }

    const paper = await paperService.createPaper({
      title,
      abstract,
      authors: JSON.parse(authors), // because form-data sends string
      uploadedBy,
      fileUrl: file.path,
    });

    return res.status(201).json(paper);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error uploading paper" });
  }
};