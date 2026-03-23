import express from "express";
import paperRoutes from "./routes/paper.routes";
import dotenv from 'dotenv'
import path from "path";
import reviewRoutes from './routes/review.routes'
import authRoutes from './routes/auth.routes'
import cookieParser from "cookie-parser";

const app = express();

dotenv.config()
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/auth", authRoutes);
app.use("/papers", paperRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;