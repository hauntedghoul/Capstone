import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:6969/login', {
                username,
                password
            });
            console.log('User logged in:', res.data);
        
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
        
            setError('');
        
            console.log('Navigating to account page');
            navigate('/account');
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : 'An error occurred. Please try again.');
        }
    };
    

    return (
        <div className='login-container'>
            <div>
                <img className='login-logo' src='/images/logo.png' alt='logo' />
            </div>

            <div>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="login-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className='login' onClick={handleLogin}>LOGIN</button>
            {error && <p className='error'>{error}</p>}
            <p className='signup'>Don't have an account? Click <Link to="/signup">Here</Link> to make one.</p>
        </div>
    );
};

export default Login;
