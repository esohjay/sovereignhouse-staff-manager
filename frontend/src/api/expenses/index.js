import { appApi } from "../app";

const expenseApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    uploadReceipt: build.mutation({
      query: (formBody) => ({
        url: "/expenses/upload",
        method: "POST",
        body: formBody,
      }),
    }),
    createExpense: build.mutation({
      query: (formBody) => ({
        url: "/expenses",
        method: "POST",
        body: formBody,
      }),
      invalidatesTags: [{ type: "Expenses", id: "LIST" }],
    }),
    updateExpense: build.mutation({
      query: (formBody) => ({
        url: `/expenses/${formBody.id}`,
        method: "PUT",
        body: formBody,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Expenses", id: "LIST" },
        { type: "Expenses", id },
      ],
    }),
    getAllExpenses: build.query({
      query: () => "/expenses",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Expenses", id })),
              { type: "Expenses", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LEAVELIST' }` is invalidated
            [{ type: "Expenses", id: "LIST" }],
    }),
    getExpenses: build.query({
      query: (id) => ({
        url: `/expenses/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Expenses", id }],
    }),
    getUserExpenses: build.query({
      query: (id) => ({
        url: `/expenses/${id}/user-expenses`,
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Expenses", id })),
              { type: "Expenses", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LEAVELIST' }` is invalidated
            [{ type: "Expenses", id: "LIST" }],
    }),
    deleteExpenses: build.mutation({
      query(id) {
        return {
          url: `expenses/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Staff `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Expenses", id }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useUpdateExpenseMutation,
  useGetExpensesQuery,
  useDeleteExpensesMutation,
  useGetUserExpensesQuery,
  useUploadReceiptMutation,
} = expenseApi;
