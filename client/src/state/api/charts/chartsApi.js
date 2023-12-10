import apiSlice from "state/api";

const chartApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTotalPnl: builder.query({
            query: (id = 0) => `trade/${id}/getTotalPnlStats`,
            transformResponse: (response) => response.success ? response.tradeStats : [],
            providesTags: ["Charts"]
        }),
        getDailyPnlReturns: builder.query({
            query: (id = 0) => `trade/${id}/getDailyStats`,
            transformResponse: (response) => response.success ? response.stats : [],
            providesTags: ["Charts"]
        }),
        getWeeklyPnl: builder.query({
            query: (id = 0) => `trade/${id}/getWeeklyStats`,
            transformResponse: (response) => response.success ? response.weeklyPnl : [],
            providesTags: ["Charts"]
        }),
        getMonthlyPnl: builder.query({
            query: (id = 0) => `trade/${id}/getMonthlyStats`,
            transformResponse: (response) => response.success ? response.monthlyStats : [],
            providesTags: ["Charts"]
        }),
    }),
    overrideExisting: true
});

export const { useGetTotalPnlQuery, useGetWeeklyPnlQuery, useGetMonthlyPnlQuery, useGetDailyPnlReturnsQuery } = chartApiSlice;