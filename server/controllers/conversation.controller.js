import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import mongoose from "mongoose";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverID;
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields are required!", 400));
  }
  let conversation = await Conversation.findOne({
    participantIds: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participantIds: [senderId, receiverId],
    });
  }

  const newMsg = await Message.create({
    senderId,
    receiverId,
    message,
  });

  if (newMsg) {
    conversation.messages.push(newMsg.id);
    await conversation.save();
  }

  //! getSocketId
  const socketID = getSocketId(receiverId);
  io.to(socketID).emit("newMsg",newMsg)
  res.status(200).json({
    success: true,
    responseData: newMsg,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.user.id;
  const otherParticipantId = req.params.otherParticipantId;

  if (!myId || !otherParticipantId) {
    return next(new errorHandler("All fileds are required!", 400));
  }

  let conversation = await Conversation.findOne({
    participantIds: {
      $all: [myId, otherParticipantId],
    },
  }).populate("messages");

  res.status(200).send({
    success: true,
    responseData: conversation,
  });
});
