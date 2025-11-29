import { createSlice } from "@reduxjs/toolkit";
import { getMessagesThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: null,
};
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ! Send Messages
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      console.log("sendmessage thunk data", action.payload);
      state.messages = [
        ...state.messages,
        action.payload?.responseData?.message,
      ];
      state.buttonLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // ! Get Messages
    builder.addCase(getMessagesThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      state.messages = action.payload?.responseData?.messages;
      state.screenLoading = false;
    });
    builder.addCase(getMessagesThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});

export const {} = messageSlice.actions;

export default messageSlice.reducer;
