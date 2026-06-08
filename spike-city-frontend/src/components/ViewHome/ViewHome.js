// src/components/ViewHome/ViewHome.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import EventsCalendar from '../EventsCalendar/EventsCalendar';
import useEventsList from '../../hooks/useEventsList';
import NextEventCountdown from '../NextEventCountdown/NextEventCountdown';
import TeamCards from '../TeamCards/TeamCards';
import './ViewHome.css';

const ViewHome = ({ user }) => {
  const { events } = useEventsList(user);

  return (
    <Container>
      {/* Welcome */}
      <h1 className="home-text vice-city-text">Welcome to Spike City!</h1>

      <img
        src="/volleyball_team_photo.jpg"
        alt="Photo of Volleyball Team"
        className="home-photo"
      />

      <section>
        <h2 className="home-text pricedown-heading">Next Event</h2>
        <NextEventCountdown events={events} />
      </section>

      <section>
        <h2 className="home-text pricedown-heading">All Events</h2>
        {user ? (
          <EventsCalendar events={events} />
        ) : (
          <p className="vice-city-text-small">
            Please log in to see upcoming events!
          </p>
        )}
      </section>

      <section>
        <h2 className="home-text pricedown-heading">Created by</h2>
        <TeamCards />
      </section>
    </Container>
  );
};

export default ViewHome;