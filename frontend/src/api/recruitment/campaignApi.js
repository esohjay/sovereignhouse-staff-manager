import { appApi } from "../app";

const campaignApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    createCampaign: build.mutation({
      query: (formBody) => ({
        url: "/campaign",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Campaign", id: "LIST" }],
    }),
    getCampaigns: build.query({
      query: () => "/campaign",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Campaign", id })),
              { type: "Campaign", id: "CAMPAIGNLIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Campaign", id: "CAMPAIGNLIST" }],
    }),
    getCampaign: build.query({
      query: (id) => ({
        url: `/campaign/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Campaign", id }],
    }),
    deleteCampaign: build.mutation({
      query(id) {
        return {
          url: `campaign/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Staff `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Campaign", id }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useCreateCampaignMutation,
  useGetCampaignsQuery,
  useGetCampaignQuery,
  useDeleteCampaignMutation,
} = campaignApi;
