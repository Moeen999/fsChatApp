import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessages",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/messages/send-messages/${receiverId}`,
        {
          message,
        }
      );
      return res.data;
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  "message/getMessages",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/messages/get-messages/${receiverId}`
      );
      return res.data;
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);
