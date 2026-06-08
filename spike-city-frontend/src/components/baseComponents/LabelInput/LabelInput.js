import { Form } from 'react-bootstrap';

/**
 * @function LabelInput
 * @description Reusable labeled text input field.
 * @param {Object} props
 * @param {string} props.label - The text for the input's label.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - Change handler for the input.
 * @param {string} [props.type="text"] - The input type (defaults to "text").
 * @returns {JSX.Element}
 */
const LabelInput = ({ label, name, value, onChange, type = "text" }) => (
    <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            name={name}
            value={value}
            onChange={onChange}
        />
    </Form.Group>
);

export default LabelInput;