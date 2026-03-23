import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'secretkey'; // later move to env

export const generateToken = (userId: string) => {

  return jwt.sign({ userId }, JWT_SECRET!, {
    expiresIn: "7d",
  });
};