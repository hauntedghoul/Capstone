import React from 'react'
import { Link } from 'react-router-dom';
import './signup.css'


const signup = () => {
  return (
    <div className='sign-container'>
            <div>
                <img className='sign-logo' src='/images/logo.png' alt='logo' />
            </div>

            <div>
                <input type="text" id="email" name="email" className="sign-input" placeholder="Email" />
                <br />
                <input type="text" id="username" name="username" className="sign-input" placeholder="username" />
                <input type="text" id="password" name="password" className="sign-input" placeholder="password" />
                <br />
                <input type="text" id="confirm" name="confirm" className="sign-input" placeholder="confirm password" />
            </div>

            <Link to="/createprofile" >
                <button className='login'>SIGNUP</button>
            </Link>
            <p className='signup'>Already have an account? Click <Link to="/login" > Here</Link> to login.</p>
            
        </div>
  )
}

export default signup