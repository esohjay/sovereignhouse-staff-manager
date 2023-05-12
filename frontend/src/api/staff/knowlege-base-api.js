import { appApi } from "../app";
const kBApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    createKnowledgeBase: build.mutation({
      query: (formBody) => ({
        url: "/knowledge-base",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "KB", id: "KBLIST" }],
    }),
    getAllKnowledgeBase: build.query({
      query: () => "/knowledge-base",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "KB", id })),
              { type: "KB", id: "KBLIST" },
            ]
          : [{ type: "KB", id: "KBLIST" }],
    }),
  }),
  overrideExisting: false,
});
export const { useCreateKnowledgeBaseMutation, useGetAllKnowledgeBaseQuery } =
  kBApi;
