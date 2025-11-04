import { createSlice } from "@reduxjs/toolkit";
import { fetchUserThunk } from "./user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: () => {
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.pending, (state, action) => {
      state.entities.push(action.payload);
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.entities.push(action.payload);
    });
    builder.addCase(fetchUserThunk.rejected, (state, action) => {
      state.entities.push(action.payload);
    });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
