import React, { useState } from 'react';
import AdminDataService from "../../services/admin";
import LabelInput from '../baseComponents/LabelInput/LabelInput';
import { Form, Button } from 'react-bootstrap';
import useUpdateEventForm from '../../hooks/useUpdateEventForm';

/**
 * @function UpdateEventForm
 * @description Renders a form to update details of an existing event.
 * @param {Function} props.onClose - Function to call when the Cancel button is clicked
 * @returns {JSX.Element} The rendered form component
 */
const UpdateEventForm = ({ onClose }) => {
    const {
        currentEventNumber,
        setCurrentEventNumber,
        newEventNumber,
        setNewEventNumber,
        date,
        setDate,
        time,
        setTime,
        location,
        setLocation,
        address,
        setAddress,
        description,
        setDescription,
        handleSubmit,
        message,
  } = useUpdateEventForm(onClose);

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Update Event</h3>
            <LabelInput
              label="Current Event Number:"
              name="currentEventNumber"
              value={currentEventNumber}
              onChange={(e) => setCurrentEventNumber(e.target.value)}
            />
            <LabelInput
              label="New Event Number:"
              name="newEventNumber"
              value={newEventNumber}
              onChange={(e) => setNewEventNumber(e.target.value)}
            />
            <LabelInput
              label="Date:"
              name="eventDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <LabelInput
              label="Time:"
              name="eventTime"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <LabelInput
              label="Location:"
              name="eventLocation"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <LabelInput
              label="Address:"
              name="eventAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <LabelInput
              label="Description:"
              name="eventDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <div>{message}</div>
        </Form>
    );
};

export default UpdateEventForm;