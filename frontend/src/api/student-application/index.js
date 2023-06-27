import { appApi } from "../app";

const studentApplicationApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    createApplication: build.mutation({
      query: (formBody) => ({
        url: "/student_application",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "StudentApplication", id: "LIST" }],
    }),
    getAllApplicantions: build.query({
      query: () => "/student_application",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "StudentApplication", id })),
              { type: "StudentApplication", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LEAVELIST' }` is invalidated
            [{ type: "StudentApplication", id: "LIST" }],
    }),
    getApplicantion: build.query({
      query: (id) => ({
        url: `/student_application/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "StudentApplication", id }],
    }),
    deleteApplication: build.mutation({
      query(id) {
        return {
          url: `student_application/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Staff `id` only.
      invalidatesTags: (result, error, id) => [
        { type: "StudentApplication", id },
      ],
    }),
  }),
  overrideExisting: false,
});
export const {
  useCreateApplicationMutation,
  useGetAllApplicantionsQuery,
  useGetApplicantionQuery,
  useDeleteApplicationMutation,
} = studentApplicationApi;
