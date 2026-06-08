import React from 'react';
import { render, screen } from '@testing-library/react';
import ViewAdmin from '../components/ViewAdmin/ViewAdmin';

test('renders ViewAdmin component with initial UI', () => {
  render(<ViewAdmin user={{ sub: 'mockUser' }} />);

  // Check for heading
  expect(screen.getByText('Admin Page')).toBeInTheDocument();

  // Check dropdown toggle text is "Create Event" initially
  expect(screen.getByRole('button', { name: /Create Event/i })).toBeInTheDocument();

  // Check that the Create Event form heading is shown
  expect(screen.getByRole('heading', { name: /Create Event/i })).toBeInTheDocument();

  // Check that the Submit button is present in the form
  expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
});
