import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const userSocketMap = {};
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userID;
  if (!userId) return;
  userSocketMap[userId] = socket.id;

  io.emit("onlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

const getSocketId = (userID) => {
  return userSocketMap[userID];
};

export { io, app, server, getSocketId };
