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
              { type: "Campaign", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Campaign", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});
export const { useCreateCampaignMutation, useGetCampaignsQuery } = campaignApi;
