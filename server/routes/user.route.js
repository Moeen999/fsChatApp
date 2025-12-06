import express from "express";
import {
  deleteUser,
  getUserProfile,
  loginUser,
  logoutUser,
  otherUsers,
  registerUser,
  updateAvatar,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/get-profile", isAuthenticated, getUserProfile);
router.get("/get-other-users", isAuthenticated, otherUsers);
router.delete("/delete-account", isAuthenticated, deleteUser);
router.patch("/update-avatar", isAuthenticated, updateAvatar);


export default router;
