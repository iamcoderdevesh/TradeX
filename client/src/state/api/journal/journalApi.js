import apiSlice from "state/api";
import { SetLoadingWithResults } from "helpers";

const journalApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getJournalDetails: builder.query({
            query: ({ id = 0, TradeDate }) => `trade/${id}/getJounral${TradeDate ? '?TradeDate=' + TradeDate : ''}`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.journalDetails : [],
            invalidatesTags: ["Trade"],
        }),
        getJournalCalendar: builder.query({
            query: (id = 0) => `trade/${id}/getJournalForCalendar`,
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await SetLoadingWithResults(queryFulfilled, dispatch);
                } catch (err) {
                    return;
                }
            },
            transformResponse: (response) => response.success ? response.calendarDetails : [],
            providesTags: ["Trade"]
        }),
    }),
    overrideExisting: true
});

export const { useGetJournalDetailsQuery, useGetJournalCalendarQuery } = journalApiSlice;