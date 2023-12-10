import apiSlice from "state/api";
import { addUserInfo, setUserAuthenticated, setToken } from "../auth/authSlice";
import accountApiSlice from "../accounts/accountApi";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => `auth/getUserDetails`,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    result.data.success && dispatch(addUserInfo(result.data.userInfo));
                } catch (err) {
                    return;
                }
            },
            providesTags: ["User"]
        }),
        refresh: builder.query({
            query: () => ({
                url: 'auth/refresh',
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    if (result.data.success) {
                        dispatch(setToken({ accessToken: result.data.token }));
                        dispatch(setUserAuthenticated(true));

                        //To Get the UserDetails & AccountDetails when page refresh...
                        dispatch(userApiSlice.endpoints.getUser.initiate());
                        dispatch(accountApiSlice.endpoints.getAllAccountDetails.initiate());
                    }
                } catch (err) {
                    return;
                }
            },
        }),
        updateProfile: builder.mutation({
            query: data => ({
                url: "auth/updateProfile",
                method: "POST",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    result.data.success && dispatch(addUserInfo(result.data.userInfo));
                } catch (err) {
                    return;
                }
            },
            invalidatesTags: ["User"]
        }),
    }),
    overrideExisting: true
});

export const { useGetUserQuery, useRefreshQuery, useUpdateProfileMutation } = userApiSlice;