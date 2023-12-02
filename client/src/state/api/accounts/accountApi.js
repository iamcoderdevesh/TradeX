import { Toast } from "components/common/alerts";
import apiSlice from "state/api";

const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllAccount: builder.query({
            query: () => "accounts/getAccountDetails",
            transformResponse: (response) => response.success ? response.account : [],
            providesTags: ["Accounts"]
        }),
        getAccountById: builder.query({
            query: accountId => `accounts/getAccountById/${accountId}`,
            transformResponse: (response) => response.success ? response.account : [],
            invalidatesTags: ["Accounts"],
        }),
        createUpadateAccount: builder.mutation({
            query: data => ({
                url: "accounts/createUpdateAccount",
                method: "POST",
                body: { ...data }
            }),
            invalidatesTags: ["Accounts"],
        }),
        deleteAccount: builder.mutation({
            query: data => ({
                url: "accounts/deleteAccount",
                method: "DELETE",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    result.data?.success && Toast.success(result.data?.message);
                } catch (err) {
                    return;
                }
            },
            invalidatesTags: ["Accounts"],
        }),
    }),
    overrideExisting: true
});

export const { useGetAllAccountQuery, useGetAccountByIdQuery, useCreateUpadateAccountMutation, useDeleteAccountMutation } = accountApiSlice;