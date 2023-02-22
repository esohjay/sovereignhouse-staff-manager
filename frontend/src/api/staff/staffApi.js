import { appApi } from "../app";
const staffApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllStaff: build.query({
      query: () => "/user",
    }),
    getStaff: build.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Staff", id }],
    }),
  }),
  overrideExisting: false,
});
export const { useGetAllStaffQuery, useGetStaffQuery } = staffApi;
