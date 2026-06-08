// src/components/AddToCalendar/AddToCalendar.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { google } from 'calendar-link';

/**
 * props.event should be:
 *   { title, description, location, start, end }
 */
export default function AddToCalendar({ event }) {
  const url = google({
    title:       event.title,
    description: event.description,
    location:    event.location,
    start:       event.start,  // ISO e.g. "2025-08-01T16:34:00Z"
    end:         event.end,    // ISO
  });

  return (
    <Button
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variant="outline-primary"
      className="ms-2"
    >
      Add to Google Calendar
    </Button>
  );
}