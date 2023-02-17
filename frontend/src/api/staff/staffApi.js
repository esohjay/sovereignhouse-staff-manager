import { appApi } from "../app";
const staffApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllStaff: build.query({
      query: () => "/user",
    }),
  }),
  overrideExisting: false,
});
export const { useGetAllStaffQuery } = staffApi;
