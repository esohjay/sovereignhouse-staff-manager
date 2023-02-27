import { appApi } from "../app";

const leaveApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    requestLeave: build.mutation({
      query: (formBody) => ({
        url: "/leave",
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
  }),
  overrideExisting: false,
});
export const {
  useGetLeaveRequestsQuery,
  useRequestLeaveMutation,
  useUpdateLeaveMutation,
} = leaveApi;
