import Container from 'react-bootstrap/Container';
import Event from '../Event/Event.js'
import Row from 'react-bootstrap/Row';
import useEventsList from '../../hooks/useEventsList';
import { useParams } from 'react-router-dom';
import './EventsList.css';
import '../ViewHome/ViewHome.css';
/**
 * @component EventsList
 * @description Displays a list of events in a Bootstrap grid.
 * @param {Object} props
 * @param {Object} props.user - The user object used for fetching events.
 * @returns {JSX.Element}
 */
const EventsList = ({ user }) => {
  const { events } = useEventsList(user);
  const { id: userId } = useParams();

  return (
    <Container>
      <h2 className='event-title pricedown-heading'>Upcoming Events</h2>
      <Row>
        {events.map(event => (
          <Event key={event.id || event.num} event={event} userId={userId}/>
        ))}
      </Row>
    </Container>
  );
};

export default EventsList;
