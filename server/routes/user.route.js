import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  otherUsers,
  registerUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/get-profile", isAuthenticated, getUserProfile);
router.get("/get-other-users", isAuthenticated, otherUsers);

export default router;
