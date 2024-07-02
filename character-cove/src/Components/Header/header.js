import React from 'react'
import './header.css'

const Header = () => {
    return (
        <div className='header-back'>
            <div className='header'>
                <img src='/images/logo.png' alt='logo' className='logo' />
                <p className='title'>CHARACTER COVE</p>
                <img src='/images/pfp.jpg' alt='pfp' className='pfp' />
            </div>
        </div>
    )
}

export default Header