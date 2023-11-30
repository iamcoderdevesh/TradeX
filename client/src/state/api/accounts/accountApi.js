import apiSlice from "state/api";

const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllAccount: builder.query({
            query: () => `accounts/getAccountDetails`,
            transformResponse: (response) => response.success ? response.account : [],
        }),
        createUpadateAccount: builder.mutation({
            query: data => ({
                url: "accounts/createUpdateAccount",
                method: "POST",
                body: { ...data }
            })
        }),
    }),
    overrideExisting: true
});

export const { useGetAllAccountQuery, useCreateUpadateAccountMutation } = accountApiSlice;