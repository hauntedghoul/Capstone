import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './edit.css';

const Edit = () => {
    const [color, setColor] = useState('#000000'); // Default color


    const handleColorChange = (event) => {
        setColor(event.target.value);
    };
    
    return (
        <div className='edit-container'>
            <div className='banner-container'>
                <img src='/images/Banner.jpg' alt='banner' className='edit-banner' />
                <img src='/images/pfp.jpg' alt='pfp' className='edit-pfp' />
            </div>
            <Link to="/edit">
                <button className='edit-button-top'>CHANGE PROFILE PICTURE</button>
            </Link>
            <Link to="/edit">
                <button className='edit-button-top'>CHANGE BANNER</button>
            </Link>

            <div className='edit-info'>
                <div> 
                    <h3 className='bio'> BIO </h3>
                    <div className='edit-bio-text'>
                        <textarea id="bio" name="bio" className="bio-input" placeholder="Enter your bio..."></textarea>
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

            <Link to="/Account" >
                <button className='edit-button-bottom'>SAVE</button>
            </Link>
            <Link to="/Account">
                <button className='edit-button-bottom'>CANCEL</button>
            </Link>
        </div>
    );
}

export default Edit;
