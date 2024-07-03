import React from 'react'
import './setting.css'
import { Link } from 'react-router-dom';


const setting = () => {
    return (
        <div className='setting-container'>
            <h3>SETTINGS</h3>
            <div className='user-setting'>
                <label htmlFor="username">USERNAME: </label>
                <input type="text" id="username" name="username" className="input-box" placeholder="cowpoke_killer_" />

            <Link to="/" >
                <button className='save'>SAVE</button>
            </Link>
            </div>
            

            <div className='email-setting'>
                <label htmlFor="email">EMAIL: </label>
                <input type="text" id="username" name="email" className="input-box" placeholder="email@gmail.com" />
            <Link to="/" >
                <button className='save'>SAVE</button>
            </Link>
            </div>
            

            <div className='password-setting'>
                <label htmlFor="password">PASSWORD: </label>
                <div className='input'>
                    <input type="text" id="username" name="password" className="input-box" placeholder="Current Password" />
                    <br />
                    <input type="text" id="username" name="password" className="input-box" placeholder="New Password..." />
                    <br />
                    <input type="text" id="username" name="password" className="input-box" placeholder="Confirm New Password..." />
                </div>
                <Link to="/" >
                <button className='save'>SAVE</button>
            </Link>
            </div>
            

        </div>
    )
}

export default setting