// useGoogleLogoutHandler.js
import { useCallback } from 'react';
import { googleLogout } from '@react-oauth/google';

/**
 * Custom hook to handle Google logout.
 * @param {Function} setUser - Function to clear the user in state.
 * @returns {Function} Logout handler function.
 */
function useLogout(setUser) {
    const onLogout = useCallback(() => {
        googleLogout();
        setUser(null);
        localStorage.removeItem("login");
        //console.log('Logout Success: user logged out');
    }, [setUser]);

    return onLogout;
}

export default useLogout;
