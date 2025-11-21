import { createSlice } from "@reduxjs/toolkit";
import loginUserthunk from "./user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: () => {
      console.log("hi login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserthunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(loginUserthunk.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(loginUserthunk.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
