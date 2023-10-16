import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUser = (userId) => fetch(`http://localhst:3000/users/${userId}`);

export const getUserById = createAsyncThunk(
  "user/by-id",
  async (userId, thunkApi) => {
    try {
      const response = await fetchUser(userId);
      const data = await response.json();
      return data;
    } catch (e) {
      thunkApi.rejectWithValue(e);
    }
  }
);
