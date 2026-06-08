import { useState } from 'react';

/**
 * A custom hook for handling admin action selection and form toggling.
 *
 * @returns {Object} - Form state and handlers
 */
function useViewAdmin() {
  const [action, setAction] = useState("create"); // default action is to create

  function handleSelect(eventKey) {
    setAction(eventKey);
  }

  function closeForm() {
    setAction(null);
  }

  return { action, handleSelect, closeForm };
}

export default useViewAdmin;