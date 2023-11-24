import apiSlice from "state/api.js";
import { userLoggedIn, userRegisteredEmail } from "./authSlice";

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
          result.data.success && dispatch(userRegisteredEmail(result.data.email));
        } catch (err) {
          console.error(err);
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
          result.data.success && dispatch(userLoggedIn({ accessToken: result.data.token }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
  overrideExisting: true
});

export const { useSignUpMutation, useLoginMutation } = authApiSlice;