import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import mockServer from '../__mocks__/mockServer';
import EventDetails from '../components/EventDetails/EventDetails';

// Start mock server before tests run
beforeAll(() => mockServer.listen());
// Reset handlers after each test so tests are isolated
afterEach(() => mockServer.resetHandlers());
// Stop the server when all tests are done
afterAll(() => mockServer.close());

const mockEvent = {
  num: 1,
  date: '2025-08-15T17:00:00Z',
  location: 'Court A - Community Sports Center',
  address: '123 Main St, Springfield',
  description: 'Team Practice - drills, scrimmage, and conditioning.',
  attendees: [101, 102, 103]
};

// verifies that the EventDetails component correctly renders the description of a specific
// event passed via React Router state, ensuring the component displays the event information
// as expected.
test('renders a particular details event component', async () => {
  const EVENT_DESCRIPTION = mockEvent.description;

  // Mock localStorage.getItem to provide login data with sub
  Storage.prototype.getItem = jest.fn(() => JSON.stringify({ sub: 'mockUserId123' }));

  render(
    <MemoryRouter
      initialEntries={[{ pathname: `/events/${mockEvent.num}`, state: { event: mockEvent } }]}
    >
      <EventDetails />
    </MemoryRouter>
  );

  // Partial match to handle prefix "Description:"
  const eventDescription = await screen.findByText((content) => content.includes(EVENT_DESCRIPTION));

  expect(eventDescription).toBeInTheDocument();

  //console.log(screen.debug());

});
