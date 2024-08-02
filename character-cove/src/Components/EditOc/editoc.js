import React, { useState } from 'react'

const EditOc = () => {
    const [images, setImages] = useState([]);
  const [imageInput, setImageInput] = useState('');

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
  return (
    <div>
        <div className='createoc-container'>
      <div>
        <img className='ocbanner' src='/images/Banner.jpg' alt='banner' />
        <img src='/images/Rooster.jpg' alt='pfp' className='oc-main' />
        <div className='name'>
          <h3>
            <input className='oc-name' type='text' id='name' name='name' placeholder='NAME...' />
          </h3>
          <h4>
            <input className='quote' type='text' id='quote' name='quote' placeholder='QUOTE...' />
          </h4>
        </div>
        <div className='tag-gen'>
          <div className='general'>
            <h2>GENERAL INFO</h2>
            <p>Birthday:
              <input className='gen-info' type='text' id='birthday' name='birthday' placeholder='DOB...' />
            </p>
            <p>Age:
              <input className='gen-info' type='number' id='age' name='age' placeholder='AGE...' />
            </p>
            <p>Height:
              <input className='gen-info' type='text' id='height' name='height' placeholder='HEIGHT...' />
            </p>
            <p>Gender:
              <input className='gen-info' type='text' id='gender' name='gender' placeholder='GENDER...' />
            </p>
            <p>Pronouns:
              <input className='gen-info' type='text' id='pronouns' name='pronouns' placeholder='PRONOUNS...' />
            </p>
            <p>Nicknames:
              <input className='gen-info' type='text' id='nickname' name='nickname' placeholder='NICKNAMES(s)...' />
            </p>
            <p>Birthplace:
              <input className='gen-info' type='text' id='birth' name='birth' placeholder='BIRTHPLACE...' />
            </p>
            <p>Current Residence:
              <input className='gen-info' type='text' id='current' name='current' placeholder='CURRENT...' />
            </p>
            <p>Family:
              <input className='gen-info' type='text' id='family' name='family' placeholder='FAMILY...' />
            </p>
            <p>Occupation:
              <input className='gen-info' type='text' id='job' name='job' placeholder='JOB...' />
            </p>
          </div>
          <div className='tags'>
            <h3>TAGS</h3>
            <input className='gen-info' type='text' id='tag' name='tag' placeholder='tags...' />
            <button className='tag-button'>ADD</button>
            <p>tags will go here when added</p>
          </div>
        </div>
        <div className='persona-container'>
          <h3>PERSONALITY</h3>
          <textarea className='persona' id='persona' name='persona' placeholder='Write about their personality here...'></textarea>
        </div>
        <div className='persona-container'>
          <h3>APPEARANCE</h3>
          <textarea className='persona' id='appear' name='appear' placeholder='Write about their appearance here...'></textarea>
        </div>
        <div className='persona-container'>
          <h3>HISTORY</h3>
          <textarea className='persona' id='history' name='history' placeholder='Whats their tragic, edgy backstory (im assuming their family is dead)...'></textarea>
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
            <button onClick={handleAddImage}>Add Image</button>
          </div>
          <div className='file-input'>
            <input type='file' onChange={handleFileUpload} multiple />
          </div>
          <div className='image-gallery'>
            {images.map((image, index) => (
              <div key={index} className='image-slot' style={{ backgroundImage: `url(${image.src})` }}></div>
            ))}
          </div>
        </div>
        <div className='button-container'>
          <button className='buttons' >Save</button>
          <button className='buttons' >Cancel</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EditOc