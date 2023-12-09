import apiSlice from "state/api";

const tradeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTradeStatistics: builder.query({
            query: (accountId = 0) => `trade/${accountId}/getTradeStatistics`,
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        getTradeDetails: builder.query({
            query: (tradeId = 0) => `trade/${tradeId}/getTradeDetails`,
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        getStatistics: builder.query({
            query: ({ id = 0, type }) => ({
                url: `trade/${id}/getStats${type ? '/' + type : ''}`, //Type params for fetching data for detailed stats.
            }),
            transformResponse: (response) => response.success ? response.stats : [],
            providesTags: ["Trade"]
        }),
        addUpadateTrade: builder.mutation({
            query: data => ({
                url: "trade/addUpdateTrade",
                method: "POST",
                body: { ...data }
            }),
            invalidatesTags: ["Trade"]
        }),
        // deleteTrade: builder.mutation({
        //     query: data => ({
        //         url: "trade/deleteTrade",
        //         method: "DELETE",
        //         body: { ...data }
        //     }),
        //     async onQueryStarted(args, { queryFulfilled }) {
        //         try {
        //             const result = await queryFulfilled;
        //             result.data?.success && Toast.success(result.data?.message);
        //         } catch (err) {
        //             return;
        //         }
        //     },
        //     invalidatesTags: ["Trade"],
        // }),
    }),
    overrideExisting: true
});

export const { useGetTradeStatisticsQuery, useGetTradeDetailsQuery, useGetStatisticsQuery, useAddUpadateTradeMutation, useDeleteTradeMutation } = tradeApiSlice;