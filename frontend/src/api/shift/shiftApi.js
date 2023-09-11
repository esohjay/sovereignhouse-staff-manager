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
              { type: "Shift", id: "SHIFTLIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Shift", id: "SHIFTLIST" }],
    }),
    createShift: build.mutation({
      query: (formBody) => ({
        url: "/shift",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Shift", id: "SHIFTLIST" }],
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
    unassignTeacher: build.mutation({
      query(data) {
        return {
          url: `/shift/${data.shift}/unassign`,
          method: "PUT",
          body: data,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Shift", id }],
    }),

    getAllTimesheets: build.query({
      query: () => "/timesheet",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Timesheet", id })),
              { type: "Timesheet", id: "TIMESHEETLIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Timesheet", id: "TIMESHEETLIST" }],
    }),
    getUserTimesheet: build.query({
      query: (id) => `/timesheet/user/${id}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "UserTimesheet", id })),
              { type: "UserTimesheet", id: "UserTimesheetLIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "UserTimesheet", id: "UserTimesheetLIST" }],
    }),
    getUserShift: build.query({
      query: (id) => `/shift/${id}/user-shift`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "UserShift", id })),
              { type: "UserShift", id: "UserShiftLIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "UserShift", id: "UserShiftLIST" }],
    }),
    recordClockIn: build.mutation({
      query: (formBody) => ({
        url: "/timesheet",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [
        { type: "UserTimesheet", id: "UserTimesheetLIST" },
        { type: "UserShift", id: "UserShiftLIST" },
      ],
    }),
    endShift: build.mutation({
      query(data) {
        return {
          url: `/timesheet/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [{ type: "UserTimesheet", id: "UserTimesheetLIST" }],
    }),
    updateShift: build.mutation({
      query: (formBody) => ({
        url: `/shift/${formBody.id}`,
        method: "PUT",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Shift", id: "SHIFTLIST" }],
    }),
    deleteShift: build.mutation({
      query(id) {
        return {
          url: `shift/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Staff `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Shift", id }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetAllShiftQuery,
  useCreateShiftMutation,
  useGetShiftQuery,
  useGetAllTimesheetsQuery,
  useGetUserTimesheetQuery,
  useAssignTeacherMutation,
  useRecordClockInMutation,
  useEndShiftMutation,
  useDeleteShiftMutation,
  useUpdateShiftMutation,
  useUnassignTeacherMutation,
  useGetUserShiftQuery,
} = shiftApi;
