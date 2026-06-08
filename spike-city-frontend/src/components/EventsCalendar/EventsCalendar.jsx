import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventsCalendar.css';

const localizer = momentLocalizer(moment);

/**
 * Displays a calendar view of volleyball events.
 * Clicking an event navigates to its detail page.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.events - List of event objects.
 * @param {string|number} props.userId - Current user's ID.
 * 
 * @returns {JSX.Element} The calendar component with events.
 */
export default function EventsCalendar({ events, userId }) {
  const navigate = useNavigate();

  const mapped = events.map(evt => ({
    title: evt.description,
    start: new Date(evt.date),
    end:   new Date(evt.date),
    origEvent: evt,
  }));

  return (
    <div className="events-calendar-container">
      <Calendar
        localizer={localizer}
        events={mapped}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={e => {
          navigate(
            `/events/eventDetails/${e.origEvent.num}`,
            { state: { event: e.origEvent, userId } }
          );
        }}
      />
    </div>
  );
}