import { appApi } from "../app";
const staffApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllStaff: build.query({
      query: () => "/user",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Staff", id })),
              { type: "Staff", id: "STAFFLIST" },
            ]
          : [{ type: "Staff", id: "STAFFLIST" }],
    }),
    getStaff: build.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Staff", id }],
    }),
    updateUserDetails: build.mutation({
      query(data) {
        return {
          url: `/user/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Staff", id }],
    }),
    updateUserStatus: build.mutation({
      query(data) {
        return {
          url: `/user/${data.id}/status`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Staff", id }],
    }),
    deleteStaff: build.mutation({
      query(id) {
        return {
          url: `user/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Staff `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Staff", id }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetAllStaffQuery,
  useGetStaffQuery,
  useUpdateUserDetailsMutation,
  useUpdateUserStatusMutation,
  useDeleteStaffMutation,
} = staffApi;
