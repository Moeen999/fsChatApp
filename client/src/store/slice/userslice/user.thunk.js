import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

const loginUserthunk = createAsyncThunk(
  "users/fetchById",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export default loginUserthunk;
