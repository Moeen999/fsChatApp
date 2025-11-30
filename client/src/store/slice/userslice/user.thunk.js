import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const registerUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullName, username, password, gender }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/register", {
        fullName,
        username,
        password,
        gender,
      });
      toast.success("User Registered Successfully");
      return res.data;
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);

export const loginUserthunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      toast.success("Login Successful");
      return res.data;
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/logout");
      toast.success("Logout Successful");
      return res.data;
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      toast.error(err);
      return rejectWithValue(err);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/get-profile");
      return res.data;
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      return rejectWithValue(err);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/get-other-users");
      return res.data;
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      return rejectWithValue(err);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete("/user/delete-account");
      return res.data;
    } catch (error) {
      const err = error?.response?.data?.errMessage;
      return rejectWithValue(err);
    }
  }
);