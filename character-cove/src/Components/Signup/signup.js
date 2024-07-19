import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post('http://localhost:6969/signup', {
                username,
                email,
                password
            });

            // Save token to localStorage
            const { token } = res.data;
            if (token) {
                localStorage.setItem('token', token);
                navigate('/createprofile');
            } else {
                alert("Failed to get token.");
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className='sign-container'>
            <div>
                <img className='sign-logo' src='/images/logo.png' alt='logo' />
            </div>
            <div>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="sign-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="sign-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="sign-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    className="sign-input"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button className='login' onClick={handleSignup}>SIGNUP</button>
            <p className='signup'>Already have an account? Click <Link to="/login">Here</Link> to login.</p>
        </div>
    );
};

export default Signup;
