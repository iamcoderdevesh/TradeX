import apiSlice from "state/api";
import { setStatistics } from "../accounts/accountSlice";
import { Toast } from "components/common/alerts/index";

const tradeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTradeStatistics: builder.query({
            query: (id = 0) => `trade/${id}/getTradeStatistics`,
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        getTradeDetails: builder.query({
            query: (tradeId = 0) => `trade/${tradeId}/getTradeDetails`,
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        getStatistics: builder.query({
            query: (id = 0) => ({
                url: `trade/${id}/getStats`,
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
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
            transformResponse: (response) => response.success ? response.stats : [],
            providesTags: ["Trade"]
        }),
        getRecentTrade: builder.query({
            query: (id = 0) => `trade/${id}/getRecentTrades`,
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        addUpadateTrade: builder.mutation({
            query: data => ({
                url: "trade/addUpdateTrade",
                method: "POST",
                body: { ...data }
            }),
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
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
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
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