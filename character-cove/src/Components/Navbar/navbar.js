import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <ul>
                    {/* <li><Link to="/signup">Register</Link></li>
                    <li><Link to="/login">Login</Link></li> */}
                    <li><Link to="/">
                        < img src='./images/Home.png' className='navbarimg' alt='home' />
                        Home</Link></li>
                    <li><Link to="/about">
                        < img src='./images/About.png' className='navbarimg' alt='about' />
                        About</Link></li>
                    <li><Link to="/create">
                        < img src='./images/Create.png' className='navbarimg' alt='create' />
                        Create</Link></li>
                    <li><Link to="/post">
                        < img src='./images/Post.png' className='navbarimg' alt='post' />
                        Post</Link></li>
                    {/* <li><Link to="/notification">
                        < img src='./images/Notif.png' className='navbarimg' alt='notif' />
                        notification</Link></li> */}
                    <li><Link to="/browse">
                        < img src='./images/Browse.png' className='navbarimg' alt='browse' />
                        Browse</Link></li>
                        <li><Link to="/resources">
                        < img src='./images/Resources.png' className='navbarimg' alt='resources' />
                        Resources</Link></li>
                    {/* <li><Link to="/settings">
                        < img src='./images/Setting.png' className='navbarimg' alt='setting' />
                        Settings</Link></li> */}
                    <div className='ad'>
                        <Link to={`https://discord.gg/taUpchnxza`}>
                            <div>
                                <img src='./images/discord.png' className='navbarimg' alt='discord' />
                            </div>
                        </Link>    
                        Want access to the discord? For the low price of $2.99 a month you can! (I am joking, you don't have to pay, click the discord logo to join :] )
                        
                    </div>

                </ul>
            </nav>
        </div >
    )
}

export default Navbar