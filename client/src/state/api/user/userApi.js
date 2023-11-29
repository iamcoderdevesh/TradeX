import apiSlice from "state/api";
import { addUserInfo, setUserAuthenticated, setToken } from "../auth/authSlice";

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
            }
        }),
        refresh: builder.query({
            query: () => ({
                url: 'auth/refresh',
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log("success");
                    if (result.data.success) {
                        dispatch(setToken({ accessToken: result.data.token }));
                        dispatch(setUserAuthenticated(true));

                        //To Get the UserDetails when page refresh...
                        dispatch(userApiSlice.endpoints.getUser.initiate());
                    }
                } catch (err) {
                    return;
                }
            }
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
        }),
    }),
    overrideExisting: true
});

export const { useGetUserQuery, useRefreshQuery, useUpdateProfileMutation } = userApiSlice;