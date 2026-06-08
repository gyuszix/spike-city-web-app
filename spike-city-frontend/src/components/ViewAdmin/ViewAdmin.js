import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import CreateEventForm from '../CreateEventForm/CreateEventForm.js';
import UpdateEventForm from '../UpdateEventForm/UpdateEventForm.js';
import DeleteEventForm from '../DeleteEventForm/DeleteEventForm.js';
import useViewAdmin from '../../hooks/useViewAdmin.js';
import './ViewAdmin.css';

/**
 * ViewAdmin component renders an admin panel that allows admins to create, update and delete events.
 * 
 * @param {Object} props.user - The current logged-in user.
 * @returns {JSX.Element} The admin panel UI with action selection and corresponding forms.
 */
const ViewAdmin = ({ user }) => {
  const { action, handleSelect, closeForm } = useViewAdmin();

  return (
      <Container className="admin-panel-box">
        <h2>Admin Page</h2>

        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle>
            {action === "create" && "Create Event"}
            {action === "update" && "Update Event"}
            {action === "delete" && "Delete Event"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="create">Create Event</Dropdown.Item>
            <Dropdown.Item eventKey="update">Update Event</Dropdown.Item>
            <Dropdown.Item eventKey="delete">Delete Event</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div>
          {action === "create" && <CreateEventForm onClose={closeForm} />}
          {action === "update" && <UpdateEventForm onClose={closeForm} />}
          {action === "delete" && <DeleteEventForm onClose={closeForm} />}
        </div>
      </Container>
    );
  }

export default ViewAdmin;
