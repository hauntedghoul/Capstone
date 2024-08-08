import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './createoc.css';

const CreateOC = () => {
  const [images, setImages] = useState([]);
  const [imageInput, setImageInput] = useState('');
  const [profileImage, setProfileImage] = useState('/images/grayblock.png');
  const [bannerImage, setBannerImage] = useState('/images/grayblock.png');
  const [name, setName] = useState('');
  const [quote, setQuote] = useState('');
  const [birthday, setBirthday] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [currentResidence, setCurrentResidence] = useState('');
  const [family, setFamily] = useState('');
  const [occupation, setOccupation] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [personality, setPersonality] = useState('');
  const [appearance, setAppearance] = useState('');
  const [history, setHistory] = useState('');

  const handleAddTag = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleAddImage = () => {
    if (imageInput) {
      setImages([...images, { src: imageInput, type: 'url' }]);
      setImageInput('');
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, { src: reader.result, type: 'file' }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const characterData = {
      name,
      quote,
      birthday,
      age: parseInt(age),
      height,
      gender,
      pronouns,
      nickname,
      birthPlace,
      currentResidence,
      family,
      occupation,
      tags,
      personality,
      appearance,
      history,
      images,
      profileImage,
      bannerImage,
    };

    try {
      const response = await fetch('http://localhost:6969/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store token in localStorage
        },
        body: JSON.stringify(characterData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Character created successfully:', data);
        alert("Character Created Successfully!");
        Navigate('/')
        
      } else {
        console.error('Failed to create character');
      }
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
    <div className='createoc-container'>
      <div>
        <img className='ocbanner' src={bannerImage} alt='banner' />
        <img src={profileImage} alt='pfp' className='oc-main' />
        <div className='name'>
          <h3>
            <input className='oc-name' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='NAME...' />
          </h3>
          <h4>
            <input className='quote' type='text' value={quote} onChange={(e) => setQuote(e.target.value)} placeholder='QUOTE...' />
          </h4>
        </div>
        <div className='tag-gen'>
          <div className='general'>
            <h2>GENERAL INFO</h2>
            <p>Birthday:
              <input className='gen-info' type='text' value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder='DOB...' />
            </p>
            <p>Age:
              <input className='gen-info' type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder='AGE...' />
            </p>
            <p>Height:
              <input className='gen-info' type='text' value={height} onChange={(e) => setHeight(e.target.value)} placeholder='HEIGHT...' />
            </p>
            <p>Gender:
              <input className='gen-info' type='text' value={gender} onChange={(e) => setGender(e.target.value)} placeholder='GENDER...' />
            </p>
            <p>Pronouns:
              <input className='gen-info' type='text' value={pronouns} onChange={(e) => setPronouns(e.target.value)} placeholder='PRONOUNS...' />
            </p>
            <p>Nicknames:
              <input className='gen-info' type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder='NICKNAME(s)...' />
            </p>
            <p>Birthplace:
              <input className='gen-info' type='text' value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder='BIRTHPLACE...' />
            </p>
            <p>Current Residence:
              <input className='gen-info' type='text' value={currentResidence} onChange={(e) => setCurrentResidence(e.target.value)} placeholder='CURRENT...' />
            </p>
            <p>Family:
              <input className='gen-info' type='text' value={family} onChange={(e) => setFamily(e.target.value)} placeholder='FAMILY...' />
            </p>
            <p>Occupation:
              <input className='gen-info' type='text' value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder='JOB...' />
            </p>
          </div>

          <div className='tags'>
            <div className='tag-holder'>
              <p>Profile Image:
                <input className='gen-info' type='text' value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder='Profile Image URL...' />
              </p>
              <p>Banner Image:
                <input className='gen-info' type='text' value={bannerImage} onChange={(e) => setBannerImage(e.target.value)} placeholder='Banner Image URL...' />
              </p>
            </div>
            <div className='tag-holder'>
              <h3>TAGS</h3>
              <input className='gen-info' type='text' value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder='tags...' />
              <button className='tag-button' onClick={handleAddTag}>ADD</button>
              <div>
                {tags.map((tag, index) => (
                  <span key={index}>{tag} </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='persona-container'>
          <h3>PERSONALITY</h3>
          <textarea className='persona' value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder='Write about their personality here...'></textarea>
        </div>
        <div className='persona-container'>
          <h3>APPEARANCE</h3>
          <textarea className='persona' value={appearance} onChange={(e) => setAppearance(e.target.value)} placeholder='Write about their appearance here...'></textarea>
        </div>
        <div className='persona-container'>
          <h3>HISTORY</h3>
          <textarea className='persona' value={history} onChange={(e) => setHistory(e.target.value)} placeholder='Whats their tragic, edgy backstory (im assuming their family is dead)...'></textarea>
        </div>
        <div className='images-container'>
          <h3>IMAGES</h3>
          <div className='image-input'>
            <input
              type='text'
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder='Image URL...'
            />
            <button className='edit-button-bottom' onClick={handleAddImage}>Add Image</button>
          </div>
          <div className='file-input'>
          <label className='custom-file-input-label'>
              Select Files
              <input
                type='file'
                className='custom-file-input'
                onChange={handleFileUpload}
                multiple
              />
            </label>
          </div>
          <div className='image-gallery'>
            {images.map((image, index) => (
              <div key={index} className='image-slot' style={{ backgroundImage: `url(${image.src})` }}></div>
            ))}
          </div>
        </div>
        <div className='button-container'>
          <button className='buttons' onClick={handleSubmit}>Save</button>
          <button className='buttons'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateOC;
