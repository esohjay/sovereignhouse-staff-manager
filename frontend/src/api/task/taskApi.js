import { appApi } from "../app";
const taskApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTask: build.query({
      query: () => "/task",
    }),
    getTask: build.query({
      query: (id) => ({
        url: `/task/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
  }),
  overrideExisting: false,
});
export const { useGetAllTaskQuery, useGetTaskQuery } = taskApi;
