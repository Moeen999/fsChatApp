import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserthunk,
  logoutUserThunk,
  registerUserThunk,
} from "./user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userProfile: null,
    otherUsersProfile:null,
    buttonLoading: false,
    screenLoading: true,
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
    getProfile: () => {
      console.log("hi getProfile");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload?.userData?.user;
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

    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.userProfile = null;
      state.screenLoading = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    builder.addCase(getUserProfileThunk.pending, (state, action) => {
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userProfile = action.payload?.userData?.user;
      state.screenLoading = false;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsersProfile=action.payload?.responseData; 
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {});
  },
});

export const { register, login, logout, getProfile } = userSlice.actions;

export default userSlice.reducer;
