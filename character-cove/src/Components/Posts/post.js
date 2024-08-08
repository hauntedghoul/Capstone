import React, { useState } from 'react';
import './post.css';
import { Link, useNavigate } from 'react-router-dom';

const Post = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [postType, setPostType] = useState('art');
    const [images, setImages] = useState([]);
    const [imageLinks, setImageLinks] = useState([]);
    const [linkInput, setLinkInput] = useState('');
    const navigate = useNavigate();

    const handlePostTypeChange = (event) => {
        setPostType(event.target.value);
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages([...images, ...files]);
    };

    const handleLinkInputChange = (event) => {
        setLinkInput(event.target.value);
    };

    const handleAddImageLink = () => {
        if (linkInput) {
            setImageLinks([...imageLinks, linkInput]);
            setLinkInput(''); // Clear input after adding
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('type', postType);
            images.forEach((file) => {
                formData.append('images', file);
            });
            imageLinks.forEach((link) => {
                formData.append('imageLinks', link);
            });

            const response = await fetch('http://localhost:6969/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result = await response.json();
            console.log('Post created successfully:', result);
            navigate('/');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className='post-container'>
            <div>
                <input
                    className='post-title'
                    type='text'
                    id='posttitle'
                    name='posttitle'
                    placeholder='Title...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='images-cont'>
                <div className='upload-div'>
                    <label className='custom-file-input-label'>
                        Upload Files
                        <input
                            type='file'
                            className='custom-file-input'
                            multiple
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
                <div className='upload-div-right'>
                    <input
                        className='input'
                        type="text"
                        placeholder="Upload from Link"
                        value={linkInput}
                        onChange={handleLinkInputChange}
                    />
                    <button className='add-link-button' onClick={handleAddImageLink}>
                        Add Image
                    </button>
                </div>
                {images.map((file, index) => (
                    <div key={index} className='preview'>
                        <img className='image-preview' src={URL.createObjectURL(file)} alt={`preview-${index}`} />
                        <button className='edit-button-bottom' onClick={() => handleRemoveImage(index)}>Remove</button>
                    </div>
                ))}
                {imageLinks.map((link, index) => (
                    <div key={index} className='preview'>
                        <img className='image-preview' src={link} alt={`link-preview-${index}`} />
                        <button onClick={() => setImageLinks(imageLinks.filter((_, i) => i !== index))}>Remove</button>
                    </div>
                ))}
            </div>
            <div>
                <textarea
                    className='post-body'
                    id='postbody'
                    name='postbody'
                    placeholder='Say what you gotta man...'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
            </div>
            <div className='post-type-container'>
                <label className='radio'>
                    <input
                        type='radio'
                        value='art'
                        checked={postType === 'art'}
                        onChange={handlePostTypeChange}
                    />
                    ART
                </label>
                <label className='radio'>
                    <input
                        type='radio'
                        value='writing'
                        checked={postType === 'writing'}
                        onChange={handlePostTypeChange}
                    />
                    WRITING
                </label>
            </div>
            <button className='post-button' onClick={handleSubmit}>
                POST
            </button>
            <Link to="/">
                <button className='post-button'>CANCEL</button>
            </Link>
        </div>
    );
};

export default Post;
