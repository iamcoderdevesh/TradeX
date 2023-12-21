import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleDateClick } from 'state';

//Calendar Imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import multiMonthPlugin from '@fullcalendar/multimonth'
import './calendar.css'
import { useGetJournalCalendarQuery } from 'state/api/journal/journalApi';
import { formatDate } from 'utils/index';

const Calendar = () => {

    const dispatch = useDispatch();
    const id = useSelector((state) => state.account?.selectedAccount?.AccountId, []);
    const currency = useSelector((state) => state.account?.selectedCurrency, []) || '';
    const { data, isLoading } = useGetJournalCalendarQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: !id
    });

    const currentMode = useSelector((state) => state.global.mode);
    const profitColor = currentMode === "light" ? "#86efac" : "#166534";
    const lossColor = currentMode === "light" ? "#fca5a5" : "#b91c1c";

    // Format the data for the full calendar format
    const formatCalendarData = (calendarDetails) => {
        return calendarDetails?.map(details => {
            const { JournalDate, TradeStatus, TotalNetPnL } = details;
            const title = `${TradeStatus} : ${currency + TotalNetPnL.toFixed(2)}`;
            const date = formatDate(JournalDate, "yyyy/mm/dd");
            const backgroundColor = TradeStatus.localeCompare("PROFIT") === 0 ? profitColor : lossColor;
            return { title, date, display: "background", backgroundColor };
        });
    }

    
    const handleDateClicks = (args) => {
        if (!data || data.length === 0) return;
        const activeDates = data?.map(d => formatDate(d.JournalDate, "yyyy/mm/dd"));
        if (activeDates.includes(args.dateStr)) {
            dispatch(handleDateClick({ date: args.dateStr }));
        }
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'multiMonthYear,dayGridMonth',
                }}
                events={formatCalendarData(data) || []}
                dateClick={handleDateClicks}
                height={"80vh"} />
        </>
    )
}

export default Calendar;