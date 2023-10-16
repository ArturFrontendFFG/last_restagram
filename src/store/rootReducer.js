import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { userSlice } from "./User/user.slice";

export const rootReducers = combineReducers({
  user: userSlice.reducer,
  [api.reducerPath]: api.reducer,
});
