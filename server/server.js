import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/user.route.js";
import { connectDB } from "./db/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();

connectDB();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

// ! Routes
app.use("/api/v1/user", userRouter);

//! middlewares
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
