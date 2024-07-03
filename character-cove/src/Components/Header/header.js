import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header-back'>
            <div className='header'>
                <Link to="/" className='logo'>
                    <img src='/images/logo.png' alt='logo' className='logo' />
                </Link>
                <p className='title'>CHARACTER COVE</p>
                <Link to="/account" className='pfp'>
                    <img src='/images/pfp.jpg' alt='pfp' className='pfp' />
                </Link>
            </div>
        </div>
    )
}

export default Header