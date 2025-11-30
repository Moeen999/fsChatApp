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
  reducers: {
    setNewMessages: (state, action) => {
      const prevMessages = state.messages ?? [];
      state.messages = [...prevMessages, action.payload];
    },
  },
  extraReducers: (builder) => {
    // ! Send Messages
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      const prevMessages = state.messages ?? [];
      state.messages = [...prevMessages, action.payload?.responseData];
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

export const { setNewMessages } = messageSlice.actions;

export default messageSlice.reducer;
