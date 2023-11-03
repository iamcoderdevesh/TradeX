import React from 'react'

import { useDispatch } from 'react-redux';
import { handleDateClick } from 'state';

//Calendar Imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import multiMonthPlugin from '@fullcalendar/multimonth'
import Events from './data.json';
import './calendar.css'

const Calendar = () => {

    const dispatch = useDispatch();

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'multiMonthYear,dayGridMonth',
                }}
                events={Events.calendarEvents}
                dateClick={(args) => dispatch(handleDateClick({ date: args.dateStr }))}
                height={"80vh"} />
        </>
    )
}

export default Calendar;
