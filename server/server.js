import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./db/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use(cookieParser());

// ! Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/messages", messageRouter);

//! middlewares
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
