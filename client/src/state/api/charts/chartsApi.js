import apiSlice from "state/api";
import { SetLoadingWithResults } from "helpers";

const chartApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTotalPnl: builder.query({
            query: (id = 0) => `trade/${id}/getTotalPnlStats`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.tradeStats : [],
            providesTags: ["Charts"]
        }),
        getDailyPnlReturns: builder.query({
            query: (id = 0) => `trade/${id}/getDailyStats`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.stats : [],
            providesTags: ["Charts"]
        }),
        getWeeklyPnl: builder.query({
            query: (id = 0) => `trade/${id}/getWeeklyStats`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.weeklyPnl : [],
            providesTags: ["Charts"]
        }),
        getMonthlyPnl: builder.query({
            query: (id = 0) => `trade/${id}/getMonthlyStats`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.monthlyStats : [],
            providesTags: ["Charts"]
        }),
    }),
    overrideExisting: true
});

export const { useGetTotalPnlQuery, useGetWeeklyPnlQuery, useGetMonthlyPnlQuery, useGetDailyPnlReturnsQuery } = chartApiSlice;