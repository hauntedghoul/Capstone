import React from 'react'
import './post.css'
import { Link } from 'react-router-dom'
const post = () => {
    return (
        <div className='post-container'>
            <div >
                <input className='post-title' type='text' id='posttitle' name='posttitle' placeholder='Title...'></input>
            </div>
            <div className='images-container'>
                <div className='upload-div'>
                    <img className='upload-img' src='/images/Upload.png' />
                    <h4>Upload File</h4>
                </div>
                <div className='upload-div-right'>
                    <img className='upload-img' src='/images/Web.png' />
                    <h4>Upload from Link</h4>
                </div>
            </div>
            <div >
                <textarea className='post-body' type='text' id='postbody' name='postbody' placeholder='Say what you gotta man...'></textarea>
            </div>
            <Link to="/" >
                <button className='post-button'>POST</button>
            </Link>
            <Link to="/">
                <button className='post-button'>CANCEL</button>
            </Link>
        </div>
    )
}

export default post