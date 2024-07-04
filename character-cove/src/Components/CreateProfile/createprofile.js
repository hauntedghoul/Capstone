import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './createprofile.css';

const Createprofile = () => {
    const [color, setColor] = useState('#000000'); // Default color
    const [bannerSrc, setBannerSrc] = useState('/images/grayblock.png');
    const [pfpSrc, setPfpSrc] = useState('/images/grayblock.png');
    const fileInputRefBanner = useRef(null);
    const fileInputRefPfp = useRef(null);

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
            setBannerSrc(URL.createObjectURL(file));
        }
    };

    const handlePfpChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPfpSrc(URL.createObjectURL(file));
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
                        <textarea id="bio" name="bio" className="createbio-input" placeholder="Enter your bio..."></textarea>
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
                <Link to="/Account" >
                    <button className='edit-button-bottom'>NEXT</button>
                </Link>
            </div>
        </div>
    );
};

export default Createprofile;
