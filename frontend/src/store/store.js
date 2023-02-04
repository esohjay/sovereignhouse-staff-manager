import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
  },
});
