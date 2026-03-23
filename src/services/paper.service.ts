import { PaperModel } from "../models/paper.model";
import '../models/user.model';

export const createPaper = async (data: any) => {
  return await PaperModel.create(data);
};

export const getAllPapers = async () => {
  return await PaperModel.find()
    .populate("uploadedBy", "name email") // only needed fields
    .sort({ createdAt: -1 });
};

export const getPaperById = async (id: string) => {
  return await PaperModel.findById(id)
    .populate("uploadedBy", "name email");
};