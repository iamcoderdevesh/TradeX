import apiSlice from "state/api";
import { addUserInfo, setUserAuthenticated, userLoggedIn } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: data => ({
        url: "api/auth/register",
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
    login: builder.mutation({
      query: (data) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: { ...data }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success) {
            dispatch(userLoggedIn({ accessToken: result.data.token }));
            dispatch(addUserInfo(result.data.userInfo));
            dispatch(setUserAuthenticated(true));
          }
        } catch (err) {
          return;
        }
      },
    }),
    updateProfile: builder.mutation({
      query: data => ({
        url: "api/auth/updateProfile",
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
    getUser: builder.query({
      query: () => `api/auth/getUserDetails`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          result.data.success && dispatch(addUserInfo(result.data.userInfo));
        } catch (err) {
            return;
        }
      }
    }),
  }),
  overrideExisting: true
});

export const { useSignUpMutation, useLoginMutation, useUpdateProfileMutation, useGetUserQuery } = authApiSlice;