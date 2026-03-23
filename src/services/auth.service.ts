import { UserModel } from "../models/user.model"; 
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt"; 

export const registerUser = async (data: any) => {
  const { name, email, password } = data;

  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id.toString());

  user.password = undefined as any;
  return { user, token };
};