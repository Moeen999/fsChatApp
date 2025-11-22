import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

const registerUserThunk = createAsyncThunk(
  "users/fetchById",
  async ({ fullName, username, password, gender }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/register", {
        fullName,
        username,
        password,
        gender,
      });
      if (res.status === 200) {
        toast.success("User Registered Successfully");
        return res.data;
      }
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);

const loginUserthunk = createAsyncThunk(
  "users/fetchById",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      if (res.status === 200) {
        toast.success("Login Successful");
        return res.data;
      }
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);
export default registerUserThunk;
