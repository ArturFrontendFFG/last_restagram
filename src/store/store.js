import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { rootReducers } from "./rootReducer";
import { api } from "./api/api";
const logger = createLogger({
  collapsed: false,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
