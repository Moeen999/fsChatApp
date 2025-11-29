import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userslice/user.slice";
import messageReducer from "./slice/messageslice/message.slice";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
  },
});
