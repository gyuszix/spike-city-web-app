import { googleLogout } from '@react-oauth/google';
import useLogout from '../../hooks/useLogout';
import './Logout.css'; // <-- make sure this is here

/**
 * Renders a logout button that logs the user out when clicked.
 * 
 * @param {Object} props
 * @param {function} props.setUser - Function to clear the user state on logout.
 * 
 * @returns {JSX.Element} The logout button.
 */
function Logout({ setUser }) {
    const handleLogout = useLogout(setUser);

    return (
        <button 
            onClick={handleLogout} 
            className="logout-btn"
        >
            Logout
        </button>
    );
}

export default Logout;