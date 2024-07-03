import React from 'react';
import './home.css';
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='posts'>
      <div className='post'>
        <div className='username'>
        <Link to="/Account" className='logo'>
          <img src='/images/pfp.jpg' className='pfp' alt='pfp' />
        </Link>  
        <h3 className='user'>@cowpoke_killer_</h3>
        
        </div>
        <div className='content'>
          <p>Wow! This is the image on the about page! Isn't it so cool to look at?</p>
        </div>
        <div className='postimage'>
          <img src='/images/cowboy.png' alt='post' />
        </div>
      </div>

      <div className='post'>
        <div className='username'>
          <img src='/images/pfp.jpg' className='pfp' alt='pfp' />
          <h3 className='user'>USERNAME</h3>
        </div>
        <div className='content'>
          <p>Text text text text text text</p>
        </div>
        <div className='postimage'>
          <img src='/images/pfp.jpg' alt='post' />
        </div>
      </div>

      <div className='post'>
        <div className='username'>
          <img src='/images/pfp.jpg' className='pfp' alt='pfp' />
          <h3 className='user'>USERNAME</h3>
        </div>
        <div className='content'>
          <p>Text text text text text text</p>
        </div>
        <div className='postimage'>
          <img src='/images/discord.png' alt='post' />
        </div>
      </div>

      <div className='post'>
        <div className='username'>
          <img src='/images/pfp.jpg' className='pfp' alt='pfp' />
          <h3 className='user'>USERNAME</h3>
        </div>
        <div className='content'>
          <p>Text text text text text text</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
