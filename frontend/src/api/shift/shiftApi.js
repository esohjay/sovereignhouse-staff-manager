import { appApi } from "../app";
const shiftApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllShift: build.query({
      query: () => "/shift",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Shift", id })),
              { type: "Shift", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Shift", id: "LIST" }],
    }),
    createShift: build.mutation({
      query: (formBody) => ({
        url: "/shift",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Shift", id: "LIST" }],
    }),
    getShift: build.query({
      query: (id) => ({
        url: `/shift/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Shift", id }],
    }),
    assignTeacher: build.mutation({
      query(data) {
        return {
          url: `/shift`,
          method: "PUT",
          body: data,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Shift", id }],
    }),
    recordClockIn: build.mutation({
      query: (formBody) => ({
        url: "/timesheet",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Timesheet", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetAllShiftQuery,
  useCreateShiftMutation,
  useGetShiftQuery,
  useAssignTeacherMutation,
  useRecordClockInMutation,
} = shiftApi;
