import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import mockServer from '../__mocks__/mockServer';

import App from '../App';

// checks if the main app loads and shows the expected title text
// makes sure the top-level UI, like the Navbar title, is visible after rendering the App
beforeAll(() => {
  mockServer.listen();
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});

test('renders top-level application text', () => {
  const APP_TEXT = 'A Volleyball App';

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const textElement = screen.getByText(APP_TEXT);
  expect(textElement).toBeInTheDocument();
});
