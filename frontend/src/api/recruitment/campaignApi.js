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
    newApplication: build.mutation({
      query: (formBody) => ({
        url: "/applicant",
        method: "POST",
        body: formBody,
      }),
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
    getApplication: build.query({
      query: (id) => ({
        url: `/applicant/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Applicants", id }],
    }),
    getApplications: build.query({
      query: (id) => ({
        url: `/applicant`,
      }),
      providesTags: (result, error, id) => [{ type: "Applicants", id }],
    }),
    updateCampaign: build.mutation({
      query: (formBody) => ({
        url: `/campaign/${formBody.id}`,
        method: "PUT",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Campaign", id: "CAMPAIGNLIST" }],
    }),
    updateApplication: build.mutation({
      query: (formBody) => ({
        url: `/applicant/${formBody.id}`,
        method: "PUT",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Applicants", id: "APPLICANTLIST" }],
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
    deleteApplicant: build.mutation({
      query(id) {
        return {
          url: `applicant/${id}`,
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
  useUpdateCampaignMutation,
  useNewApplicationMutation,
  useGetApplicationQuery,
  useGetApplicationsQuery,
  useDeleteApplicantMutation,
  useUpdateApplicationMutation,
} = campaignApi;
