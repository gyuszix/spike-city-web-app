import { useState } from 'react';
import AdminDataService from '../services/admin';

/**
 * Custom hook to manage state and logic for deleting an event.
 * @returns {Object} State and handlers for the delete event form
 */
const useDeleteEventForm = () => {
    const [eventNumber, setEventNumber] = useState("");
    const [message, setMessage] = useState("");

    /**
     * Validates the event number input.
     * @returns {boolean} True if input is valid, false otherwise
     */
    const validNum = () => {
        const num = parseInt(eventNumber, 10);
        return !isNaN(num) && num > 0;
    };

    /**
     * Handles the form submission by calling the AdminDataService.
     * @param {React.FormEvent<HTMLFormElement>} e - Form event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validNum()) {
            setMessage("Must be a positive number");
            return;
        }

        setMessage(`Deleting event number: ${eventNumber}`);
        try {
            AdminDataService.deleteEvent(eventNumber);
        } catch {
            setMessage(`Error deleting event number: ${eventNumber}`);
        }
    };

    return {
        eventNumber,
        setEventNumber,
        handleSubmit,
        message,
    };
};

export default useDeleteEventForm;
