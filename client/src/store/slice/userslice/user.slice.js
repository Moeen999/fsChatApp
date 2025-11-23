import { createSlice } from "@reduxjs/toolkit";
import { loginUserthunk, logoutUserThunk, registerUserThunk } from "./user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    register: () => {
      console.log("hi register");
    },
    login: () => {
      console.log("hi login");
    },
    logout: () => {
      console.log("hi logout");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(loginUserthunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(loginUserthunk.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(loginUserthunk.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export const { register, login } = userSlice.actions;

export default userSlice.reducer;
