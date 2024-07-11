import React from 'react'
import './browse.css'

const browse = () => {
  return (
    <div className='browse-container'>
        <div className='search-container'>
            <div>
                <input className='search' type='text' id='search' name='search' placeholder='Search...'></input>
                <label><input className='radio' type='radio' id='art' name='art' value='ART'></input>ART</label>
                <label><input className='radio' type='radio' id='writing' name='writing' placeholder='WRITING'></input>WRITING</label>
            </div>
            <div className='extra-search'>
                <input className='extra' type='text' id='tag' name='tag' placeholder='TAGS...'></input>
                <input className='extra' type='text' id='genre' name='genre' placeholder='GENRE...'></input>
                
            </div>
        </div>

        <div className='browse-character-container'>
            <div className='character'>
                <img className='found-characters' src='/images/Sam.jpg' alt='sam' />
                <p>CHARACTER NAME</p>
            </div>
            <div className='character'>
                <img className='found-characters' src='/images/Rooster.jpg' alt='rooster' />
                <p>CHARACTER NAME</p>
            </div>
            <div className='character'>
                <img className='found-characters' src='/images/Doc.png' alt='doc' />
                <p>CHARACTER NAME</p>
            </div>
            <div className='character'>
                <img className='found-characters' src='/images/Graves.png' alt='graves' />
                <p>CHARACTER NAME</p>
            </div>
            <div className='character'>
                <img className='found-characters' src='/images/Sam.jpg' alt='sam' />
                <p>CHARACTER NAME</p>
            </div>
            <div className='character'>
                <img className='found-characters' src='/images/Rooster.jpg' alt='rooster' />
                <p>CHARACTER NAME</p>
            </div>
            <div className='character'>
                <img className='found-characters' src='/images/Doc.png' alt='doc' />
                <p>CHARACTER NAME</p>
            </div>
            <div className='character'>
                <img className='found-characters' src='/images/Graves.png' alt='graves' />
                <p>CHARACTER NAME</p>
            </div>
        </div>
    </div>
  )
}

export default browse
