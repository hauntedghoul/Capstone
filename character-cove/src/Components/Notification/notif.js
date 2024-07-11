import React from 'react'
import { Link } from 'react-router-dom'
import './notif.css'


const notif = () => {
  return (
    <div className='notif-container'>
        <div className='notif'>
        <Link to="/Account" className=''>
          <img src='/images/pfp.jpg' className='pfp' alt='pfp' />
        </Link>  
        <h3 className='user'>@cowpoke_killer_ followed you!</h3>
        </div>

        <div className='notif'>
        <Link to="/Account" className=''>
          <img src='/images/pfp.jpg' className='pfp' alt='pfp' />
        </Link>  
        <h3 className='user'>@cowpoke_killer_ followed you!</h3>
        </div>

        <div className='notif'>
        <Link to="/Account" className=''>
          <img src='/images/pfp.jpg' className='pfp' alt='pfp' />
        </Link>  
        <h3 className='user'>@cowpoke_killer_ followed you!</h3>
        </div>
    </div>
  )
}

export default notif