import React, { useEffect, useState } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Header = () => {
    const [profileImage, setProfileImage] = useState('/images/unknown.jpg');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const decodedToken = jwtDecode(token);
                const username = decodedToken.username;

                try {
                    const userResponse = await axios.get(`http://localhost:6969/users/${username}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    const profileResponse = await axios.get(`http://localhost:6969/profiles/${userResponse.data._id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    const imageUrl = profileResponse.data.profileImage;
                    setProfileImage(imageUrl ? `http://localhost:6969${imageUrl}` : '/images/unknown.jpg');
                } catch (error) {
                    // If fetching user profile fails, default to unknown image
                    console.error('Error fetching user profile data:', error);
                    setProfileImage('/images/unknown.jpg');
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
                setProfileImage('/images/unknown.jpg');
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className='header-back'>
            <div className='header'>
                <Link to="/" className='logo'>
                    <img src='/images/logo.png' alt='logo' className='logo' />
                </Link>
                <p className='title'>CHARACTER COVE</p>
                <Link to="/account" className='pfp'>
                    <img
                        src={profileImage}
                        alt='Profile'
                        className='pfp'
                    />
                </Link>
            </div>
        </div>
    );
}

export default Header;
