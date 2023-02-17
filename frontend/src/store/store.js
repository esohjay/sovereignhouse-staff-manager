import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import authSlice from "../features/authSlice";
import { appApi } from "../api/app";
import staffSlice from "../features/staffSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    [appApi.reducerPath]: appApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});
