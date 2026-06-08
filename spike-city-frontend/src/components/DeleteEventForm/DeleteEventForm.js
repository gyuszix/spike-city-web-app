import { Form, Button } from 'react-bootstrap';
import LabelInput from '../baseComponents/LabelInput/LabelInput.js';
import useDeleteEventForm from '../../hooks/useDeleteEventForm.js';

/**
 * @function DeleteEventForm
 * @description Renders a form to delete an event based on its event number.
 * @param {Function} props.onClose - Function to call when the Cancel button is clicked
 * @returns {JSX.Element} The rendered form component
 */
const DeleteEventForm = ({ onClose }) => {
    const { eventNumber, setEventNumber, handleSubmit, message } = useDeleteEventForm();

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Delete Event</h3>
            <LabelInput
                label="Event Number:"
                name="eventNumber"
                value={eventNumber}
                onChange={(e) => setEventNumber(e.target.value)}
            />
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <div>{message}</div>
        </Form>
    );
};

export default DeleteEventForm;