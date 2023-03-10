import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Access-Control-Allow-Headers", "Content-Type");
      const authToken = Cookies.get("token");
      if (authToken) headers.set("Authorization", authToken);
      return headers;
    },
  }),
  tagTypes: ["Staff", "Campaign, Timesheet, UserTimesheet, Task"],
  endpoints: (builder) => ({}),
});

// export const { useGetAllStaffQuery } = staffApi;
