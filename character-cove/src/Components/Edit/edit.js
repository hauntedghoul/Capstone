import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './edit.css';

const Edit = () => {
    const [color, setColor] = useState('#000000');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [selectedBannerImage, setSelectedBannerImage] = useState(null);
    const [previewProfileImage, setPreviewProfileImage] = useState('');
    const [previewBannerImage, setPreviewBannerImage] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id);

                // Fetch user profile data
                const response = await axios.get(`http://localhost:6969/profiles/${decodedToken.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const { bio, backgroundColor, profileImage, bannerImage } = response.data;

                setBio(bio);
                setColor(backgroundColor);
                setProfileImage(profileImage);
                setBannerImage(bannerImage);

                // Set previews for images
                setPreviewProfileImage(profileImage ? `http://localhost:6969${profileImage}` : '/images/default-profile.jpg');
                setPreviewBannerImage(bannerImage ? `http://localhost:6969${bannerImage}` : '/images/default-banner.png');
            } catch (error) {
                console.error('Error fetching profile data:', error);
                navigate('/login');
            }
        };

        fetchProfileData();
    }, [navigate]);

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedProfileImage(file);
            setPreviewProfileImage(URL.createObjectURL(file)); // Show preview of selected image
        }
    };

    const handleBannerImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedBannerImage(file);
            setPreviewBannerImage(URL.createObjectURL(file)); // Show preview of selected image
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const formData = new FormData();
            formData.append('bio', bio);
            formData.append('backgroundColor', color);
            if (selectedProfileImage) formData.append('profileImage', selectedProfileImage);
            if (selectedBannerImage) formData.append('bannerImage', selectedBannerImage);

            await axios.put(`http://localhost:6969/profiles/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate('/Account');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const decodedToken = jwtDecode(token);
                const username = decodedToken.username; // Assuming username is available in the token

                await axios.delete(`http://localhost:6969/delete/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Clear token and navigate to login
                localStorage.removeItem('token');
                navigate('/login');
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };

    return (
        <div className='edit-container'>
            <div className='banner-container'>
                <img src={previewBannerImage} alt='banner' className='edit-banner' />
                <img src={previewProfileImage} alt='pfp' className='edit-pfp' />
            </div>
            <div className='einput'>
                <label htmlFor="profileImage" className="custom-file-input-label">Choose Profile Image</label>
                <input id="profileImage" type="file" className="custom-file-input" onChange={handleProfileImageChange} />

                <label htmlFor="bannerImage" className="custom-file-input-label">Choose Banner Image</label>
                <input id="bannerImage" type="file" className="custom-file-input" onChange={handleBannerImageChange} />
            </div>
            <div className='edit-info'>
                <div>
                    <h3 className='bio'>BIO</h3>
                    <textarea
                        id="bio"
                        name="bio"
                        className="bio-input"
                        placeholder="Enter your bio..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="color">Profile Theme: </label>
                </div>
                <input
                    type="color"
                    id="color"
                    name="color"
                    value={color}
                    onChange={handleColorChange}
                    className="color-picker"
                />
            </div>

            <button className='edit-button-bottom' onClick={handleSave}>SAVE</button>
            <Link to="/Account">
                <button className='edit-button-bottom'>CANCEL</button>
            </Link>
            <button className='delete-button' onClick={handleDeleteAccount}>DELETE ACCOUNT</button>
        </div>
    );
}

export default Edit;
