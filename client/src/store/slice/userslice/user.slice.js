import { createSlice } from "@reduxjs/toolkit";
import fetchUserThunk from "./user.thunk";

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
    builder.addCase(fetchUserThunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(fetchUserThunk.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
