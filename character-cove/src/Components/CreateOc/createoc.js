import React from 'react'
import './createoc.css'
const createoc = () => {
    return (
        <div className='createoc-container'>
            <div>
                <img className='ocbanner' src='/images/Banner.jpg' alt='banner' />

                <img src='/images/Rooster.jpg' alt='pfp' className='oc-main' />
                <div className='name'>
                    <h3> <input className='oc-name' type='text' id='name' name='name' placeholder='NAME...'></input>
                    </h3>
                    <h4> <input className='quote' type='text' id='quote' name='quote' placeholder='QUOTE...'></input> </h4>
                </div>
                <div className='tag-gen'>
                    <div className='general'>

                        <h2>GENERAL INFO</h2>
                        <p>Birthday:
                            <input className='gen-info' type='text' id='birthday' name='birthday' placeholder='DOB...'></input>
                        </p>
                        <p>Age:
                            <input className='gen-info' type='number' id='age' name='age' placeholder='AGE...'></input>
                        </p>
                        <p>Height:
                            <input className='gen-info' type='text' id='height' name='height' placeholder='HEIGHT...'></input>
                        </p>
                        <p>Gender:
                            <input className='gen-info' type='text' id='gender' name='gender' placeholder='GENDER...'></input>
                        </p>
                        <p>Pronouns:
                            <input className='gen-info' type='text' id='pronouns' name='pronouns' placeholder='PRONOUNS...'></input>
                        </p>
                        <p>Nicknames:
                            <input className='gen-info' type='text' id='nickname' name='nickname' placeholder='NICKNAMES(s)...'></input>
                        </p>
                        <p>Birthplace:
                            <input className='gen-info' type='text' id='birth' name='birth' placeholder='BIRTHPLACE...'></input>
                        </p>
                        <p>Current Residence:
                            <input className='gen-info' type='text' id='current' name='current' placeholder='CURRENT...'></input>
                        </p>
                        <p>Family:
                            <input className='gen-info' type='text' id='family' name='family' placeholder='FAMILY...'></input>
                        </p>
                        <p>Occupation:
                            <input className='gen-info' type='text' id='job' name='job' placeholder='JOB...'></input>
                        </p>
                    </div>
                    <div className='tags'>
                        <h3>TAGS</h3>
                    <input className='gen-info' type='text' id='tag' name='tag' placeholder='tags...'></input>
                <button className='tag-button'>ADD</button>

                    <p>tags will go here when generated</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default createoc