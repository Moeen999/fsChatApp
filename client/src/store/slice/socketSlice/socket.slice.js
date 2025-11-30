import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: null,
};
export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initialSocket: (state, action) => {
      const socket = io(import.meta.env.VITE_DB_ORIGIN, {
        query: {
          userID: action.payload,
        },
      });
      state.socket = socket;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { initialSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;
