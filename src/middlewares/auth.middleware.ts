import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model";

const JWT_SECRET  = process.env.JWT_SECRET_KEY || 'secretkey';

export const protect = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};