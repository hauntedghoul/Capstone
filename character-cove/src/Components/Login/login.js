import React from 'react'
import './login.css'
import { Link } from 'react-router-dom';


const login = () => {
    return (
        <div className='login-container'>
            <div>
                <img className='login-logo' src='/images/logo.png' alt='logo' />
            </div>

            <div>
                <input type="text" id="username" name="password" className="login-input" placeholder="Email" />
                <br />
                <input type="text" id="username" name="password" className="login-input" placeholder="Password" />
            </div>

            <Link to="/" >
                <button className='login'>LOGIN</button>
            </Link>
            <p className='signup'>Don't have an account? Click <Link to="/signup" > Here</Link> to make one.</p>
        </div>
    )
}

export default login