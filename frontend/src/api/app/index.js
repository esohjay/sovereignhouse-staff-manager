import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../config/firebase";
import Cookies from "js-cookie";
console.log(auth?.currentUser?.accessToken);
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
  tagTypes: [
    "Staff",
    "Campaign",
    "Timesheet",
    "UserTimesheet",
    "Task",
    "Applicants",
    "KB",
    "Expenses",
  ],
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (formBody) => ({
        url: "/applicant/upload",
        method: "POST",
        body: formBody,
      }),
    }),
  }),
});

export const { useUploadMutation } = appApi;
