import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  sendMessage,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/send-messages/:receiverID", isAuthenticated, sendMessage);
router.get("/get-messages/:otherParticipantId", isAuthenticated, getMessages);

export default router;
