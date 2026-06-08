import React from 'react';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import './Event.css';
import { Link } from 'react-router-dom';

/**
 * Displays a summary of a volleyball meetup event inside a clickable link.
 *
 * @param {Object} props
 * @param {Object} props.event - The event data object.
 * @param {number} props.event.num - The event number.
 * @param {string|Date} props.event.date - The event date.
 * @param {string} props.event.location - The event location.
 * @param {string|number} props.userId - The ID of the current user.
 * 
 * @returns {JSX.Element} A link wrapping event details.
 */
const Event = ({ event, userId }) => {

    return (
        <Link to={`/events/eventDetails/${event.num}`} state={{event, userId}}>
            <Container className="event-box">
                <h3>Volleyball Meetup #{event.num}</h3>
                <p>Date: {moment(event.date).format('MMMM Do YYYY')}</p>
                <p>Location: {event.location}</p>
            </Container>
        </Link>
    );
};

export default Event;