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
    getKnowledgeBase: build.query({
      query: (id) => ({
        url: `/knowledge-base/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "KB", id }],
    }),
    updateKnowledgeBase: build.mutation({
      query(data) {
        return {
          url: `/knowledge-base/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "KB", id }],
    }),
    deleteKnowledgeBase: build.mutation({
      query(id) {
        return {
          url: `knowledge-base/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: (result, error, id) => [{ type: "KB", id }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useCreateKnowledgeBaseMutation,
  useGetAllKnowledgeBaseQuery,
  useUpdateKnowledgeBaseMutation,
  useGetKnowledgeBaseQuery,
  useDeleteKnowledgeBaseMutation,
} = kBApi;
