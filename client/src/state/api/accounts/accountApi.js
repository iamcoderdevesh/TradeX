import { Toast } from "components/common/alerts";
import { SetLoadingWithResults } from "helpers";
import apiSlice from "state/api";
import { addAccountInfo } from 'state/api/accounts/accountSlice';

const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllAccountDetails: builder.query({
            query: () => `accounts/getAccountDetails/0`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await SetLoadingWithResults(queryFulfilled, dispatch);
                    result.data?.success && dispatch(addAccountInfo(result.data?.account));
                } catch (err) {
                    return;
                }
            },
            providesTags: ["Accounts"]
        }),
        getAccountDetails: builder.query({
            query: (id = 0) => `accounts/getAccountDetails/${id}`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.account : [],
            providesTags: ["Accounts"]
        }),
        createUpadateAccount: builder.mutation({
            query: data => ({
                url: "accounts/createUpdateAccount",
                method: "POST",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await SetLoadingWithResults(queryFulfilled, dispatch);
                    result.data?.success && Toast.success(result.data?.message);
                } catch (err) {
                    return;
                }
            },
            invalidatesTags: ["Accounts"],
        }),
        deleteAccount: builder.mutation({
            query: data => ({
                url: "accounts/deleteAccount",
                method: "DELETE",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await SetLoadingWithResults(queryFulfilled, dispatch);
                    result.data?.success && Toast.success(result.data?.message);
                } catch (err) {
                    return;
                }
            },
            invalidatesTags: ["Accounts", "Trade", "Charts"],
        }),
    }),
    overrideExisting: true
});

export const { useGetAllAccountDetailsQuery, useGetAccountDetailsQuery, useCreateUpadateAccountMutation, useDeleteAccountMutation } = accountApiSlice;
export default accountApiSlice;