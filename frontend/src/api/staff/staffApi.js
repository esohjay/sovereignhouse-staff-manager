import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../config/firebase";
import Cookies from "js-cookie";
const getAuth = async (url) => {
  const token = await auth.currentUser?.getIdToken();
  console.log(token);
  return {
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const staffApi = createApi({
  reducerPath: "staffApi",
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
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getAllStaff: builder.query({
      query: () => "/user",
    }),
  }),
});

export const { useGetAllStaffQuery } = staffApi;
