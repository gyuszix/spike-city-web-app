import { GoogleLogin } from '@react-oauth/google';
import useLogin from '../../hooks/useLogin';

/**
 * Renders a Google login button and handles login success/failure.
 * 
 * @param {Object} props
 * @param {function} props.setUser - Function to set the logged-in user state.
 * 
 * @returns {JSX.Element} The Google login button.
 */
function Login({ setUser }) {
    const { onSuccess, onFailure } = useLogin(setUser); 

    return (
        <div>
            <GoogleLogin
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
}

export default Login;