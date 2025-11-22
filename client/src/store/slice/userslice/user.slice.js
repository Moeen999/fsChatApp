import { createSlice } from "@reduxjs/toolkit";
import registerUserThunk from "./user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    register: () => {
      console.log("hi register");
    },
    // login: () => {
    //   console.log("hi login");
    // },
  },
  extraReducers: (builder) => {
    // builder.addCase(loginUserthunk.pending, (state, action) => {
    //   console.log("pending");
    // });
    // builder.addCase(loginUserthunk.fulfilled, (state, action) => {
    //   console.log("fulfilled");
    // });
    // builder.addCase(loginUserthunk.rejected, (state, action) => {
    //   console.log("rejected");
    // });
    builder.addCase(registerUserThunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export const { register, login } = userSlice.actions;

export default userSlice.reducer;
