import { createAsyncThunk } from "@reduxjs/toolkit";

 const fetchUserThunk = createAsyncThunk(
  "users/fetchById",
  async () => {
    console.log("hello buddi daa");
  }
);
export default fetchUserThunk;