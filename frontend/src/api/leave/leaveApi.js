import { appApi } from "../app";

const leaveApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    requestLeave: build.mutation({
      query: (formBody) => ({
        url: "/leave/add-leave-admin",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Leave", id: "LEAVELIST" }],
    }),
    addLeaveAdmin: build.mutation({
      query: (formBody) => ({
        url: "/leave/add-leave-admin",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Leave", id: "LEAVELIST" }],
    }),
    updateLeave: build.mutation({
      query: (formBody) => ({
        url: `/leave/${formBody.id}`,
        method: "PUT",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Leave", id: "LEAVELIST" }],
    }),
    getLeaveRequests: build.query({
      query: () => "/leave",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Leave", id })),
              { type: "Leave", id: "LEAVELIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LEAVELIST' }` is invalidated
            [{ type: "Leave", id: "LEAVELIST" }],
    }),
    getLeave: build.query({
      query: (id) => ({
        url: `/leave/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Leave", id }],
    }),
    getUserLeave: build.query({
      query: (id) => ({
        url: `/leave/${id}/user-leave-request`,
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Leave", id })),
              { type: "Leave", id: "LEAVELIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LEAVELIST' }` is invalidated
            [{ type: "Leave", id: "LEAVELIST" }],
    }),
    deleteLeave: build.mutation({
      query(id) {
        return {
          url: `leave/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Staff `id` only.
      invalidatesTags: (result, error, id) => [{ type: "leave", id }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetLeaveRequestsQuery,
  useRequestLeaveMutation,
  useUpdateLeaveMutation,
  useGetLeaveQuery,
  useDeleteLeaveMutation,
  useGetUserLeaveQuery,
  useAddLeaveAdminMutation,
} = leaveApi;
