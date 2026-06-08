import React, { useState } from 'react';
import AdminDataService from "../../services/admin";
import { Form, Button } from 'react-bootstrap';
import LabelInput from '../baseComponents/LabelInput/LabelInput';
import useCreateEventForm from '../../hooks/useCreateEventForm';

/**
 * @function CreateEventForm
 * @description Renders a form to create a new event with fields for date, location, and address.
 * @param {Function} onClose - Function to call when the Cancel button is clicked
 * @returns {JSX.Element} The rendered form component
 */
const CreateEventForm = ({ onClose }) => {
    const {
        date,
        time,
        location,
        address,
        description,
        setDate,
        setTime,
        setLocation,
        setAddress,
        setDescription,
        handleSubmit,
        message,
    } = useCreateEventForm();

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Create Event</h3>
            <LabelInput
                label="Date"
                type="date"
                name="eventDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <LabelInput
                label="Time"
                type="time"
                name="eventTime"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <LabelInput
                label="Location"
                type="text"
                name="eventLocation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <LabelInput
                label="Address"
                type="text"
                name="eventAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <LabelInput
                label="Description"
                type="text"
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

export default CreateEventForm;