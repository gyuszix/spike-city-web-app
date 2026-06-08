// frontend/src/components/EventDetails/EventDetails.js
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';
import EventsDataService from '../.././services/events';
import AddToCalendar from '../AddToCalendar/AddToCalendar';
import './EventDetails.css';

/**
 * Shows detailed information about a specific volleyball event.
 * Allows the logged-in user to RSVP and add the event to their calendar.
 * 
 * @component
 * 
 * @returns {JSX.Element} The event details view.
 */
const EventDetails = () => {
  const { state } = useLocation();
  const { event } = state;
  const loginData = JSON.parse(localStorage.getItem('login') || 'null');
  const userId = loginData?.sub;

  // Track count and whether the user is attending, if you are reading this Jordan; fyi this doesn't actually do anything, it's just a graphical update lol
  
  const [attendeeCount, setAttendeeCount] = useState(event.attendees.length);
  const [isAttending, setIsAttending] = useState(
    Array.isArray(event.attendees) && event.attendees.includes(userId)
  );

  const handleRSVP = async () => {
    try {
      await EventsDataService.rsvp(userId, event.num);

      if (isAttending) {
        // User leaving
        setAttendeeCount((n) => Math.max(0, n - 1));
        setIsAttending(false);
      } else {
        // User joining
        setAttendeeCount((n) => n + 1);
        setIsAttending(true);
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const start = new Date(event.date).toISOString();
  const end = new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000).toISOString();

  return (
    <Container className="event-details-box">
      <h3>Volleyball Meetup #{event.num}</h3>
      <p>Date: {moment(event.date).format('MMMM Do YYYY')}</p>
      <p>Time: {moment(event.date).format('h:mm A')}</p>
      <p>Location: {event.location}</p>
      <p>Address: {event.address}</p>
      <p>Description: {event.description}</p>
      <p>Attendees: {attendeeCount}</p>

      <div>
        <Button as={Link} to={`/events/${userId}`}>List all events</Button>
        <Button onClick={handleRSVP}>
          {isAttending ? 'I am not going!' : 'I am going!'}
        </Button>

        <AddToCalendar
          event={{
            title: `Volleyball Meetup #${event.num}`,
            description: event.description,
            location: `${event.location}, ${event.address}`,
            start,
            end,
          }}
        />
      </div>
    </Container>
  );
};

export default EventDetails;