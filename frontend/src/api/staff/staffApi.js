import { appApi } from "../app";
const staffApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    createStaff: build.mutation({
      query: (formBody) => ({
        url: "/user",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Staff", id: "LIST" }],
    }),
    makeAdmin: build.mutation({
      query: (formBody) => ({
        url: "/user/make-admin",
        method: "POST",
        body: formBody,
      }),
    }),
    getAllStaff: build.query({
      query: () => "/user",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Staff", id })),
              { type: "Staff", id: "STAFFLIST" },
            ]
          : [{ type: "Staff", id: "STAFFLIST" }],
    }),
    getStaff: build.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Staff", id }],
    }),
    resetPassword: build.mutation({
      query: (formBody) => ({
        url: "/user/reset-password",
        method: "POST",
        body: formBody,
      }),
    }),
    changeStatus: build.mutation({
      query: (formBody) => ({
        url: `/user/${formBody.userId}/change-status`,
        method: "PUT",
        body: formBody,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Staff", id }],
    }),
    updateUserDetails: build.mutation({
      query(data) {
        return {
          url: `/user/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Staff", id }],
    }),

    deleteStaff: build.mutation({
      query(id) {
        return {
          url: `user/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: (result, error, id) => [{ type: "Staff", id }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetAllStaffQuery,
  useGetStaffQuery,
  useUpdateUserDetailsMutation,
  useDeleteStaffMutation,
  useCreateStaffMutation,
  useResetPasswordMutation,
  useChangeStatusMutation,
  useMakeAdminMutation,
} = staffApi;
