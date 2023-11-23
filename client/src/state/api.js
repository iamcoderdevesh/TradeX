import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL });

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    endpoints: builder => ({}),
    tagTypes: ["User", "Auth", "Accounts", "Tags", "Trades"],
    keepUnusedDataFor: 5
});

export default apiSlice
