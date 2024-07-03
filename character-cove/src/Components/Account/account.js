import React from 'react'
import './account.css'
import { Link } from 'react-router-dom'


const account = () => {
  return (
    <div className='account-container'>
            <div className='banner-container'>
                <img src='/images/Banner.jpg' alt='banner' className='banner'/>
                <img src='/images/pfp.jpg' alt='pfp' className='profile-picture'/>
                <Link to="/edit">
                    <button className='edit-button'>Edit</button>
                </Link>
            </div>
            <div className='info-container'>
                <p className='pf-user'>@cowpoke_killer_</p>
                <div className='follow-info'>
                    <div className='following'>
                        FOLLOWING
                        <div className='number'>00</div>
                    </div>
                    <div className='followers'>
                        FOLLOWERS
                        <div className='number'>00</div>
                    </div>
                </div>
                <div> 
                    <h3 className='bio'> BIO </h3>
                    <div className='bio-text'>
                        Howdy! I'm Rooster (wow really), and for several years I have had a strong love for creating characters of my own! Currently I am trying to get a degree in web development and am making this all on my lonesome. A big problem I noticed a while ago within the OC community is the lack of places to store and share your characters that you put so much work into, or a place to talk to others and get help/ideas for your characters! I can't wait to see what people do with this when I am finally done and able to use it (if you're reading this I would like to think this is open to the public now :]). 
                    </div>
                </div>
            </div>

            <div className='character-container'>
                <img className='characters' src='/images/Sam.jpg' alt='sam' />
                <img className='characters' src='/images/Rooster.jpg' alt='sam' />
                <img className='characters' src='/images/Doc.png' alt='sam' />
                <img className='characters' src='/images/Graves.png' alt='sam' />
                <img className='characters' src='/images/Sam.jpg' alt='sam' />
                <img className='characters' src='/images/Rooster.jpg' alt='sam' />
                <img className='characters' src='/images/Doc.png' alt='sam' />
                <img className='characters' src='/images/Graves.png' alt='sam' />
            </div>
            
        </div>
  )
}

export default account