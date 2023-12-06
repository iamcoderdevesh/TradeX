import { Toast } from "components/common/alerts";
import apiSlice from "state/api";

const tradeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTradeDetails: builder.query({
            query: (id = 0) => `trade/${id}/getTradeDetails`,
            transformResponse: (response) => response.success ? response.tradeDetails : [],
            providesTags: ["Trade"]
        }),
        getStatistics: builder.query({
            query: ({ id = 0, type }) => ({
                url: `trade/${id}/getStats/${type ? type : ''}`,
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
            invalidatesTags: ["Trade"],
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

export const { useGetTradeDetailsQuery, useGetStatisticsQuery, useAddUpadateTradeMutation, useDeleteTradeMutation } = tradeApiSlice;