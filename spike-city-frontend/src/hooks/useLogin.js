import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

/**
 * Custom hook to handle Google login success and failure callbacks.
 * @param {Function} setUser - Function to set the user in state.
 * @returns {{ onSuccess: Function, onFailure: Function }}
 */
function useLogin(setUser) {
    const onSuccess = useCallback((res) => {
        const tokenData = jwtDecode(res.credential);
        const loginData = {
            googleId: tokenData.sub,
            ...tokenData,
        };
        setUser(loginData);
        localStorage.setItem("login", JSON.stringify(loginData));
        //console.log('Login Success: currentUser:', loginData);
    }, [setUser]);

    const onFailure = useCallback(() => {
        console.log('Login failed:');
    }, []);

    return { onSuccess, onFailure };
}

export default useLogin;
