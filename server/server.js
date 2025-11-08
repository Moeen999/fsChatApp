import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/user.route.js";
import { connectDB } from "./db/db.js";
const app = express();

connectDB();
const PORT = process.env.PORT;
app.use(express.json());


// ! Routes
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
