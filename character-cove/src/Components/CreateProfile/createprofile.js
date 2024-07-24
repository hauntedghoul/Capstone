import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './createprofile.css';

const CreateProfile = () => {
  const [color, setColor] = useState('#000000'); // Default color
  const [bannerSrc, setBannerSrc] = useState('/images/grayblock.png');
  const [pfpSrc, setPfpSrc] = useState('/images/grayblock.png');
  const [bio, setBio] = useState('');
  const fileInputRefBanner = useRef(null);
  const fileInputRefPfp = useRef(null);
  const navigate = useNavigate();

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleBannerClick = () => {
    if (fileInputRefBanner.current) {
      fileInputRefBanner.current.click();
    }
  };

  const handlePfpClick = () => {
    if (fileInputRefPfp.current) {
      fileInputRefPfp.current.click();
    }
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePfpChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPfpSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No authentication token found. Please log in.');
        return;
      }

      const formData = new FormData();
      if (fileInputRefPfp.current.files[0]) {
        formData.append('profileImage', fileInputRefPfp.current.files[0]);
      }
      if (fileInputRefBanner.current.files[0]) {
        formData.append('bannerImage', fileInputRefBanner.current.files[0]);
      }
      formData.append('bio', bio);
      formData.append('backgroundColor', color);

      const res = await axios.post(
        'http://localhost:6969/profiles',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Profile created:', res.data);
      navigate('/account');
    } catch (error) {
      console.error('Error creating profile:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='create-profile-container'>
      <h1>PROFILE SETUP</h1>
      <p>All of these fields can be changed later</p>
      <div className='banner-container'>
        <img src={bannerSrc} alt='banner' className='edit-banner' />
        <img src={pfpSrc} alt='pfp' className='edit-pfp' />
      </div>
      <button className='createprof-button' onClick={handlePfpClick}>CHOOSE PROFILE PICTURE</button>
      <button className='createprof-button' onClick={handleBannerClick}>CHOOSE BANNER</button>
      <input
        type="file"
        ref={fileInputRefBanner}
        style={{ display: 'none' }}
        onChange={handleBannerChange}
      />
      <input
        type="file"
        ref={fileInputRefPfp}
        style={{ display: 'none' }}
        onChange={handlePfpChange}
      />
      <div className='create-info'>
        <div>
          <h3 className='bio'> BIO </h3>
          <div className='edit-bio-text'>
            <textarea
              id="bio"
              name="bio"
              className="createbio-input"
              placeholder="Enter your bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
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
      <div>
        <button className='edit-button-bottom' onClick={handleSubmit}>NEXT</button>
      </div>
    </div>
  );
};

export default CreateProfile;
