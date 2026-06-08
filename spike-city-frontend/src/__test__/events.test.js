import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import mockServer from '../__mocks__/mockServer';
import EventsList from '../components/EventsList/EventsList.js';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

// This test verifies that <EventsList> correctly fetches event data and renders
// an event to the screen based on the mocked backend response.
test('renders event description from mock data', async () => {
  const mockUser = { sub: 'mockUserId123' };
  const EVENT_1 = 'Volleyball Meetup #1';
  const EVENT_2 = 'Volleyball Meetup #2';
  const EVENT_3 = 'Volleyball Meetup #3';

  render(
    <MemoryRouter>
      <EventsList user={mockUser} />
    </MemoryRouter>
  );

  // Wait until the event description appears in the document
  await waitFor(() => {
    expect(screen.getByText(EVENT_1)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(EVENT_2)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(EVENT_3)).toBeInTheDocument();
  });

  //console.log(screen.debug());

});
