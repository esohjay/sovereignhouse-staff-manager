import { appApi } from "../app";
const shiftApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllShift: build.query({
      query: () => "/user",
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
  }),
  overrideExisting: false,
});
export const { useGetAllShiftQuery, useCreateShiftMutation } = shiftApi;
