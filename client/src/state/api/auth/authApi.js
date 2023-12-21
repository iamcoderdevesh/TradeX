import apiSlice from "state/api";
import { addUserInfo, setUserAuthenticated, setToken } from "./authSlice";
import { Toast } from "components/common/alerts";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: data => ({
        url: "auth/register",
        method: "POST",
        body: { ...data }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success) {
            dispatch(addUserInfo(result.data.userInfo));
            Toast.success(result.data?.message);
          }
        } catch (err) {
          return;
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: { ...data }
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success) {
            dispatch(setToken({ accessToken: result.data.token }));
            dispatch(setUserAuthenticated(true));
            Toast.success(result.data?.message);
          }
        } catch (err) {
          return;
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUserAuthenticated(false));
        } catch (error) {
          return;
        }
      },
    }),
  }),
  overrideExisting: true
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation } = authApiSlice;