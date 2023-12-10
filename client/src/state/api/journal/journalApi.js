import apiSlice from "state/api";

const journalApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getJournalDetails: builder.query({
            query: ({id = 0, TradeDate}) => `trade/${id}/getJounral${TradeDate ? '?TradeDate=' + TradeDate : ''}`,
            transformResponse: (response) => response.success ? response.journalDetails : [],
            invalidatesTags: ["Trade"],
        }),
        getJournalCalendar: builder.query({
            query: (id = 0) => `trade/${id}/getJournalForCalendar`,
            transformResponse: (response) => response.success ? response.calendarDetails : [],
            providesTags: ["Trade"]
        }),
    }),
    overrideExisting: true
});

export const { useGetJournalDetailsQuery, useGetJournalCalendarQuery } = journalApiSlice;