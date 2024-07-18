import React, { useState } from 'react';
import './setting.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Setting = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();

    const getToken = () => {
        return localStorage.getItem('token'); // Or wherever you store your token
    };

    const handleSaveUsername = async () => {
        try {
            const res = await axios.put(
                'http://localhost:6969/users',
                { username },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );
            console.log('Username updated:', res.data);
            navigate('/');
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    const handleSaveEmail = async () => {
        try {
            const res = await axios.put(
                'http://localhost:6969/users',
                { email },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );
            console.log('Email updated:', res.data);
            navigate('/');
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    const handleSavePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const res = await axios.put(
                'http://localhost:6969/users',
                { password: newPassword },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );
            console.log('Password updated:', res.data);
            navigate('/');
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className='setting-container'>
            <h3>SETTINGS</h3>
            <div className='user-setting'>
                <label htmlFor="username">USERNAME: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="input-box"
                    placeholder="cowpoke_killer_"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className='save' onClick={handleSaveUsername}>SAVE</button>
            </div>

            <div className='email-setting'>
                <label htmlFor="email">EMAIL: </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="input-box"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className='save' onClick={handleSaveEmail}>SAVE</button>
            </div>

            <div className='password-setting'>
                <label htmlFor="password">PASSWORD: </label>
                <div className='input'>
                    <input
                        type="password"
                        id="currentPassword"
                        name="password"
                        className="input-box"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        id="newPassword"
                        name="password"
                        className="input-box"
                        placeholder="New Password..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="password"
                        className="input-box"
                        placeholder="Confirm New Password..."
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </div>
                <button className='save' onClick={handleSavePassword}>SAVE</button>
            </div>
        </div>
    );
};

export default Setting;
