import { useState } from 'react';
import AdminDataService from '../services/admin';

/**
 * Custom hook to manage state and submission logic for updating an event.
 *
 * @param {Function} onClose - Callback to run when the form closes
 * @returns {Object} - Form state and handlers
 */
const useUpdateEventForm = (onClose) => {
    const [currentEventNumber, setCurrentEventNumber] = useState("");
    const [newEventNumber, setNewEventNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    /**
     * Validates the input for the new event.
     * @returns {boolean} True if input is valid, false otherwise
     */
    const validForm = () => {
        // require a current event number
        if (!currentEventNumber) {
            setMessage('Must indicate a current event number');
            return false;
        }

        if ((date && !time) || (!date && time)) {
            setMessage('Both date and time must be provided together');
            return false;
        }

        if (date && time) {
            const dateTimeString = `${date}T${time}`;
            const eventDate = new Date(dateTimeString);
            if (isNaN(eventDate.getTime())) {
                setMessage('Invalid date or time');
                return false;
            }
        }

        return true;
    };

    /**
     * Takes an event to be updated and fills out the updated fields only;
     * @return {Event} With all only updated fields filled out.
     */
    const getNewEventData = () => {
        
        const event = {};

        if (newEventNumber) {
            event.num = Number(newEventNumber);
        } else {
            event.num = Number(currentEventNumber);
        }
        if (date) {
            const dateTimeString = `${date}T${time}`;
            event.date = new Date(dateTimeString).toISOString();
        }
        if (location) {
            event.location = location;
        }
        if (address) {
            event.address = address;
        }
        if (description) {
            event.description = description;
        }

        return event;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!validForm()) {
            return;
        }

        const event = getNewEventData();
        //console.log(`event: ${JSON.stringify(event)}`);

        try {
            await AdminDataService.updateEvent(currentEventNumber, event);
            setMessage("If this event exists it was updated")
            // close the form after submit
        } catch {
            setMessage('Could not update form');
        }

    };

    return {
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
    };
};

export default useUpdateEventForm;
