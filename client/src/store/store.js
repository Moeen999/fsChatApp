import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userslice/user.slice";
import messageReducer from "./slice/messageslice/message.slice";
import socketReducer from "./slice/socketSlice/socket.slice";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },
  middleware:(getDefaultmiddleware)=>
    getDefaultmiddleware({
      serializableCheck:{
        ignoredPaths:["socketReducer.socket"]
      }
    })
  
});
