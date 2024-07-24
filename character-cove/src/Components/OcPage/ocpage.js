import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ocpage.css';

const OcPage = () => {
  const { id } = useParams(); // Get the character ID from the URL
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:6969/characters/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched character data:', data); // Debugging line
        setCharacter(data);
      })
      .catch(error => {
        console.error('Error fetching character:', error);
      });
  }, [id]);

  if (!character) {
    return <div> Loading...</div>; 
  }

  return (
    <div className='createoc-container'>
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
                <img
                  key={index}
                  className='character-image'
                  src={image}
                  alt={`character ${index}`}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OcPage;
