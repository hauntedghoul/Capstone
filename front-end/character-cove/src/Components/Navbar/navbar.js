import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <ul>
                    {/* <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/account">Account</Link></li> */}
                    <li><Link to="/">
                        < img src='./images/Home.png' />
                        Home</Link></li>
                    <li><Link to="/about">
                        < img src='./images/About.png' />
                        About</Link></li>
                    
                    <li><Link to="/create">
                        < img src='./images/Create.png' />
                        create</Link></li>
                    <li><Link to="/notification">
                        < img src='./images/Notif.png' />
                        notification</Link></li>
                    <li><Link to="/settings">
                        < img src='./images/Setting.png' />
                        Settings</Link></li>
                    <li><Link to="/search">
                        < img src='./images/Search.png' />
                        Search</Link></li>
                    <li><Link to="/browse">
                        < img src='./images/Browse.png' />
                        browse</Link></li>
                    <div className='ad'>
                        <div><img src='./images/discord.png'/></div>
                    Want access to the discord? For the low price of $2.99 a month you can! (I am joking, you don't have to pay, just ask and I will let you in!)
                    </div>

                </ul>
            </nav>
        </div>
    )
}

export default Navbar