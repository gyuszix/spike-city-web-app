import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock event data
const mockEventsResponse = {
  events: [
    {
      num: 1,
      date: '2025-08-15T17:00:00Z',
      location: 'Court A - Community Sports Center',
      address: '123 Main St, Springfield',
      description: 'Team Practice - drills, scrimmage, and conditioning.',
      attendees: [101, 102, 103]
    },
    {
      num: 2,
      date: '2025-08-20T19:30:00Z',
      location: 'Main Gym - Downtown Arena',
      address: '456 Center Ave, Springfield',
      description: 'League Match vs Wildcats. Bring your A-game!',
      attendees: [104, 105, 106, 107]
    },
    {
      num: 3,
      date: '2025-08-25T18:00:00Z',
      location: 'Court B - Riverside Park',
      address: '789 River Rd, Springfield',
      description: 'Friendly Scrimmage with the local recreational team.',
      attendees: []
    }
  ]
};

// Log base URL
console.log('Mock server started for: http://localhost:5001');

const mockServer = setupServer(
  // Handle GET requests to the events endpoint
  rest.get('http://localhost:5001/api/v1/events', (req, res, ctx) => {
    console.log('Mock server received /events request:', req.url.toString());
    return res(ctx.status(200), ctx.json(mockEventsResponse));
  })
);

export default mockServer;
