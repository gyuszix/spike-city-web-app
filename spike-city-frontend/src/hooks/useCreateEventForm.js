import { useState } from 'react';
import AdminDataService from '../services/admin';

/**
 * @function useCreateEventForm
 * @description Custom hook to manage form state and submission logic for creating an event.
 * @returns {Event}
 */
const useCreateEventForm = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    /**
     * Validates the input for the new event.
     * @returns {boolean} True if input is valid, false otherwise
     */
    const validForm = () => {
    // 1) No empty or all-space fields
    if (
        !date.trim() ||
        !time.trim() ||
        !location.trim() ||
        !address.trim() ||
        !description.trim()
    ) {
        setMessage("All fields must be filled out.");
        return false;
    }

    // 2) Date/time can actually be parsed
    const dateTime = new Date(`${date}T${time}`);
    if (isNaN(dateTime.getTime())) {
        setMessage("Invalid date or time format.");
        return false;
    }

    // 3) Must be in the future
    if (dateTime <= new Date()) {
        setMessage("Event date and time must be in the future.");
        return false;
    }

    return true;
    };

    /**
     * Handles form submission by formatting data and calling the backend.
     * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        if (!validForm()) {
            return;
        }

        const dateTimeString = `${date}T${time}`;
        const dateTimeISO = new Date(dateTimeString).toISOString();

        const event = {
            date: dateTimeISO,
            location,
            address,
            description,
            attendees: [],
        };

        setMessage("Event Created");
        try {
            AdminDataService.createEvent(event);
        } catch (e) {
            setMessage('Failed to create event');
        }
    };

    return {
        date,
        time,
        location,
        address,
        description,
        message,
        setDate,
        setTime,
        setLocation,
        setAddress,
        setDescription,
        handleSubmit,
    };
};

export default useCreateEventForm;
