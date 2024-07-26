import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ocpage.css';

const OcPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    images: [],
    profileImage: '',
    bannerImage: '',
    name: '',
    quote: '',
    birthday: '',
    age: '',
    height: '',
    gender: '',
    pronouns: '',
    nickname: '',
    birthPlace: '',
    currentResidence: '',
    family: '',
    occupation: '',
    tags: [],
    personality: '',
    appearance: '',
    history: '',
  });
  const [newTag, setNewTag] = useState('');
  const [newImage, setNewImage] = useState('');

  const getCurrentUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('user', user);
      return user;
    } catch (e) {
      console.error('Error parsing user from local storage:', e);
      return null;
    }
  };

  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchCharacter = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const response = await fetch(`http://localhost:6969/characters/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched character data:', data);
        setCharacter(data);
        setFormData(data); // Initialize formData with character data
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      await axios.delete(`http://localhost:6969/characters/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/account');
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const updatedCharacter = await axios.put(`http://localhost:6969/characters/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCharacter(updatedCharacter.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleAddImage = () => {
    if (newImage.trim() && !formData.images.some(img => img.src === newImage.trim())) {
      setFormData({ ...formData, images: [...formData.images, { src: newImage.trim() }] });
      setNewImage('');
    }
  };

  const handleRemoveImage = (image) => {
    setFormData({ ...formData, images: formData.images.filter(img => img.src !== image.src) });
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  console.log('Character user ID:', character.user);
  console.log('Current user ID:', currentUser?._id);

  return (
    <div className='createoc-container'>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <img className='ocbanner' src={formData.bannerImage} alt='banner' />
          <img src={formData.profileImage} alt='pfp' className='oc-main' />
          <div className='name'>
            <h3>
              <input className='oc-name' type="text" name="name" value={formData.name} onChange={handleChange} />
            </h3>
            <h4>
              <input type="text" name="quote" value={formData.quote} onChange={handleChange} />
            </h4>
          </div>

          <div className='tag-gen'>
            <div className='general'>
              <h2>GENERAL INFO</h2>
              <p>Birthday:
                <input type="text" name="birthday" value={formData.birthday} onChange={handleChange} placeholder="DOB..." />
              </p>
              <p>Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="AGE..." />
              </p>
              <p>Height:
                <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="HEIGHT..." />
              </p>
              <p>Gender:
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="GENDER..." />
              </p>
              <p>Pronouns:
                <input type='text' name='pronouns' value={formData.pronouns} onChange={handleChange} placeholder='PRONOUNS...' />
              </p>
              <p>Nicknames:
                <input type='text' name='nickname' value={formData.nickname} onChange={handleChange} placeholder='NICKNAMES...' />
              </p>
              <p>Birthplace:
                <input type='text' name='birthPlace' value={formData.birthPlace} onChange={handleChange} placeholder='BIRTHPLACE...' />
              </p>
              <p>Current Residence:
                <input type='text' name='currentResidence' value={formData.currentResidence} onChange={handleChange} placeholder='CURRENT RESIDENCE...' />
              </p>
              <p>Family:
                <input type='text' name='family' value={formData.family} onChange={handleChange} placeholder='FAMILY...' />
              </p>
              <p>Occupation:
                <input type='text' name='occupation' value={formData.occupation} onChange={handleChange} placeholder='OCCUPATION...' />
              </p>
            </div>

            <div className='tags'>
              <div className='tag-holder'>
                <p>Profile Image:
                  <input className='gen-info' type='text' name='profileImage' value={formData.profileImage} onChange={handleChange} placeholder='Profile Image URL...' />
                </p>
                <p>Banner Image:
                  <input className='gen-info' type='text' name='bannerImage' value={formData.bannerImage} onChange={handleChange} placeholder='Banner Image URL...' />
                </p>
              </div>
              <div className='tag-holder'>
                <h3>TAGS</h3>
                <input type='text' value={newTag} onChange={handleTagChange} placeholder='Add a tag...' />
                <button className='tag-button' type='button' onClick={handleAddTag}>Add Tag</button>

                {formData.tags.length > 0 && (
                  <div className='tags-container'>
                    {formData.tags.map((tag, index) => (
                      <div key={index} className='tag-item'>
                        {tag}
                        <button className='tag-button' type='button' onClick={() => handleRemoveTag(tag)}>Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='persona-container'>
            <h3>PERSONALITY</h3>
            <textarea className='persona' name="personality" value={formData.personality} onChange={handleChange} placeholder="Write about their personality here..." />
          </div>
          <div className='persona-container'>
            <h3>APPEARANCE</h3>
            <textarea className='persona' name="appearance" value={formData.appearance} onChange={handleChange} placeholder="Write about their appearance here..." />
          </div>
          <div className='persona-container'>
            <h3>HISTORY</h3>
            <textarea className='persona' name="history" value={formData.history} onChange={handleChange} placeholder="Write about their history here..." />
          </div>
          <div className='images-container'>
            <h3>IMAGES</h3>
            <input type='text' value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder='Add image URL...' />
            <button type='button' onClick={handleAddImage}>Add Image</button>
            <div className='image-gallery'>
              {formData.images.length > 0 ? (
                formData.images.map((image, index) => (
                  <div key={index} className='image-item'>
                    <img className='character-image' src={image.src} alt={`character ${index}`} />
                    <button className='remove-image' type='button' onClick={() => handleRemoveImage(image)}>Remove</button>
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
          <button className='buttons' type='submit'>Save</button>
          <button className='buttons' type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <img className='ocbanner' src={character.bannerImage} alt='banner' />
          <img src={character.profileImage} alt='pfp' className='oc-main' />
          <div className='name'>
            <h2>{character.name}</h2>
            <h4>{character.quote}</h4>
          </div>
          <div className='tag-gen'>
            <div className='general'>
              <h2>GENERAL INFO</h2>
              <p>Birthday: {character.birthday}</p>
              <p>Age: {character.age}</p>
              <p>Height: {character.height}</p>
              <p>Gender: {character.gender}</p>
              <p>Pronouns: {character.pronouns}</p>
              <p>Nicknames: {character.nickname}</p>
              <p>Birthplace: {character.birthPlace}</p>
              <p>Current Residence: {character.currentResidence}</p>
              <p>Family: {character.family}</p>
              <p>Occupation: {character.occupation}</p>
            </div>
            <div className='tags'>
              {character.user === currentUser?._id && (
                <div>
                  <button className='buttons' onClick={() => setIsEditing(true)}>Edit</button>
                  <button className='buttons' onClick={handleDelete}>Delete</button>
                </div>
              )}
              <h3>TAGS</h3>
              {character.tags && character.tags.length > 0 ? (
                <div className='tags-container'>
                  {character.tags.map((tag, index) => (
                    <span key={index} className='tag-item'>{tag}</span>
                  ))}
                </div>
              ) : (
                <p>No tags available</p>
              )}
            </div>
          </div>
          <div className='persona-container'>
            <h3>PERSONALITY</h3>
            <p className='personality'>{character.personality}</p>
          </div>
          <div className='persona-container'>
            <h3>APPEARANCE</h3>
            <p className='personality'>{character.appearance}</p>
          </div>
          <div className='persona-container'>
            <h3>HISTORY</h3>
            <p className='personality'>{character.history}</p>
          </div>
          <div className='images-container'>
            <h3>IMAGES</h3>
            <div className='image-gallery'>
              {character.images && Array.isArray(character.images) && character.images.length > 0 ? (
                character.images.map((image, index) => (
                  <div key={index} className='image-item'>
                    <img className='character-image' src={image.src} alt={`character ${index}`} />
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OcPage;
