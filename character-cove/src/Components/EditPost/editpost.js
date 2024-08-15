import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editpost.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    type: '',
    images: []
  });
  const [newImage, setNewImage] = useState('');
  const [imagesToRemove, setImagesToRemove] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:6969/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPost(response.data);
        setFormData({
          ...response.data,
          images: [...response.data.images]  // Create a copy of images array
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.value);
  };

  const handleAddImage = () => {
    if (newImage) {
      setFormData({
        ...formData,
        images: [...formData.images, newImage]
      });
      setNewImage('');
    }
  };

  const handleRemoveImage = (image) => {
    setFormData({
      ...formData,
      images: formData.images.filter(img => img !== image)
    });
    setImagesToRemove([...imagesToRemove, image]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:6969/posts/${id}`, {
        title: formData.title,
        body: formData.body,
        type: formData.type,
        imagesToRemove: imagesToRemove,
        images: formData.images
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/account');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className='edit-post-container'>
      <h1>Edit Post</h1>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div >
            <input className='post-title' type='text' name='title' value={formData.title} onChange={handleChange} />
          </div>
          <div className='images-cont-edit'>
            <div className='upload-div'>
              <input
                className='input'
                type='text'
                placeholder='Enter image URL'
                value={newImage}
                onChange={handleImageChange}
              />
              <button className='add-link-button' type='button' onClick={handleAddImage}>Add Image</button>
            </div>
            {formData.images.map((image, index) => (
              <div className='preview' key={index}>
                <img className='image-preview' src={image.startsWith('http') ? image : `http://localhost:6969${image}`} alt={`Image ${index}`} />
                <button className='edit-button-bottom' type='button' onClick={() => handleRemoveImage(image)}>Remove</button>
              </div>
            ))}

          </div>
          <div>
            <textarea className='post-body' name='body' value={formData.body} onChange={handleChange}></textarea>
          </div>
          <button className='post-button' type='submit'>Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
