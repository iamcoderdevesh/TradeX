import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set('Authorization', token);
        }
        return headers;
    },
});

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    endpoints: builder => ({}),
    tagTypes: ["User", "Auth", "Accounts", "Tags", "Trades"]
});

export default apiSlice
