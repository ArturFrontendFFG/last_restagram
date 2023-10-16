import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "./user.actions";
import { registrationService } from "../../service/registration.service";

const initialState = {
  isLoading: false,
  error: null,
  user: JSON.parse(localStorage.getItem(`userId`)),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      (state.isLoading = false), (state.user = action.payload);
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.user = {};
    });
  },
});
