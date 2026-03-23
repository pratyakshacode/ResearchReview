import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === "User already exists") {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.loginUser(req.body);

    // remove password
    user.password = undefined as any;

    return res
      .cookie("token", token, {
        httpOnly: true, // cannot access via JS
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
      })
      .json({ user });

  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};