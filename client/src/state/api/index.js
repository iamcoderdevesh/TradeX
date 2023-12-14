import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, setUserAuthenticated } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
    prepareHeaders: async (headers, { getState }) => {
        const token = getState()?.auth?.accessToken;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.originalStatus === 403) {
        const refreshResult = await baseQuery(`auth/refresh`, api, extraOptions);
        if (refreshResult?.data?.success) {
            api.dispatch(setToken({ accessToken: refreshResult?.data?.token }));
            result = await baseQuery(args, api, extraOptions);
        }
        else {
            await baseQuery(`auth/logout`, api, extraOptions);
            api.dispatch(setUserAuthenticated(false));
        }
    }
    return result;
}

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
    tagTypes: ["User", "Accounts", "Tags", "Trades", "Charts"]
});

export default apiSlice;
