import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserthunk,
  logoutUserThunk,
  registerUserThunk,
} from "./user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    screenLoading: false,
    userProfile: null,
    buttonLoading: false,
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserthunk.pending, (state, action) => {
      state.screenLoading = true;
      state.buttonLoading = true;
    });
    builder.addCase(loginUserthunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userProfile = action.payload?.userData?.user;
      state.screenLoading = false;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserthunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
    });
    builder.addCase(logoutUserThunk.pending, (state, action) => {});
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {});
    builder.addCase(logoutUserThunk.rejected, (state, action) => {});
  },
});

export const { register, login } = userSlice.actions;

export default userSlice.reducer;
