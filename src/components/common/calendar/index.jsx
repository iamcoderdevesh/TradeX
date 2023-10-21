import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import multiMonthPlugin from '@fullcalendar/multimonth'
import Events from './data.json';
import './calendar.css'

const Calendar = () => {
    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    return (
        
        <FullCalendar
            plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'multiMonthYear,dayGridMonth',
            }}
            events={Events.calendarEvents}
            dateClick={handleDateClick}
            height={"80vh"}
        />
    )
}

export default Calendar;
