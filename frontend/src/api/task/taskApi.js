import { appApi } from "../app";
const taskApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTask: build.query({
      query: () => "/task",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Task", id })),
              { type: "Task", id: "TASKLIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Task", id: "TASKLIST" }],
    }),
    getTask: build.query({
      query: (id) => ({
        url: `/task/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    getUserTasks: build.query({
      query: (id) => `/task/user/${id}`,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Task", id })),
              { type: "Task", id: "TASKLIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Task", id: "TASKLIST" }],
    }),
    createTask: build.mutation({
      query: (formBody) => ({
        url: "/task",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Task", id: "TASKLIST" }],
    }),
    updateTask: build.mutation({
      query: (formBody) => ({
        url: `/task/${formBody.id}`,
        method: "PUT",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Task", id: "TASKLIST" }],
    }),
    assignStaff: build.mutation({
      query(data) {
        return {
          url: `/task`,
          method: "PUT",
          body: data,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }],
    }),
    deleteTask: build.mutation({
      query(id) {
        return {
          url: `task/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Staff `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Task", id }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetAllTaskQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useGetUserTasksQuery,
  useUpdateTaskMutation,
  useAssignStaffMutation,
  useDeleteTaskMutation,
} = taskApi;
