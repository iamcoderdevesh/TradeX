import apiSlice from "state/api";
import { setStatistics } from "../accounts/accountSlice";
import { Toast } from "components/common/alerts";
import { SetLoadingWithResults } from "helpers";

const tradeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTradeStatistics: builder.query({
            query: ({ id = 0, tradeId }) => `trade/${id}/getTradeStatistics${tradeId ? '?id=' + tradeId : ''}`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        getTradeDetails: builder.query({
            query: (tradeId = 0) => `trade/${tradeId}/getTradeDetails`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        getStatistics: builder.query({
            query: (id = 0) => ({
                url: `trade/${id}/getStats`,
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await SetLoadingWithResults(queryFulfilled, dispatch);
                    result.data.success && dispatch(setStatistics(result.data.stats));
                } catch (err) {
                    return;
                }
            },
            providesTags: ["Trade"]
        }),
        getDetailedStatistics: builder.query({
            query: ({ id = 0, type }) => ({
                url: `trade/${id}/getStats${type ? '/' + type : ''}`, //Type params for fetching data for detailed stats.
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.stats : [],
            providesTags: ["Trade"]
        }),
        getRecentTrade: builder.query({
            query: (id = 0) => `trade/${id}/getRecentTrades`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        addUpadateTrade: builder.mutation({
            query: data => ({
                url: "trade/addUpdateTrade",
                method: "POST",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await SetLoadingWithResults(queryFulfilled, dispatch);
                    result.data?.success && Toast.success(result.data?.message);
                } catch (err) {
                    return;
                }
            },
            invalidatesTags: ["Trade", "Charts"]
        }),
        deleteTrade: builder.mutation({
            query: data => ({
                url: "trade/deleteTrade",
                method: "DELETE",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await SetLoadingWithResults(queryFulfilled, dispatch);
                    result.data?.success && Toast.success(result.data?.message);
                } catch (err) {
                    return;
                }
            },
            invalidatesTags: ["Trade", "Charts"]
        }),
    }),
    overrideExisting: true
});

export const { useGetTradeStatisticsQuery, useGetTradeDetailsQuery, useGetStatisticsQuery, useGetDetailedStatisticsQuery, useGetRecentTradeQuery, useAddUpadateTradeMutation, useDeleteTradeMutation } = tradeApiSlice;