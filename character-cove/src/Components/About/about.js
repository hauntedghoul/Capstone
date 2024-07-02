import React from 'react'
import './about.css'

const About = () => {
    return (
        <div >
            <div className='block1'>
            <div>
                <img src='/images/cowboy.png' className='cowboy' alt='cowboy'/>
            </div>
            <div className='text1'>
            <h1> ABOUT ROOSTER</h1>
            Howdy! I'm Rooster (wow really), and for several years I have had a strong love for creating characters of my own! Currently I am trying to get a degree in web development and am making this all on my lonesome. A big problem I noticed a while ago within the OC community is the lack of places to store and share your characters that you put so much work into, or a place to talk to others and get help/ideas for your characters! I can't wait to see what people do with this when I am finally done and able to use it (if you're reading this I would like to think this is open to the public now :]). 
            </div>
            </div>
            <div className='text2'>
                <h1> THE VISION</h1>
                Character Cove aims to create a user-friendly web platform tailored to creators and enthusiasts of original characters (OCs). Whether you’re a storyteller, artist, or role-player, this platform will allow you to unleash your imagination when creating original characters. Character Cove is designed to make it easier for you to bring your characters to life, with features that cater to multiple aspects of character creation, from personality to visual aesthetics.
            </div>
        </div>
    )
}

export default About