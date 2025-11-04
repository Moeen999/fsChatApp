import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userslice/user.slice";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});
