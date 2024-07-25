import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './browse.css';

const Browse = () => {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get('http://localhost:6969/all-characters'); // Adjust the URL if necessary
                setCharacters(response.data);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
    
        fetchCharacters();
    }, []);

    const handleCharacterClick = (id) => {
        navigate(`/ocpage/${id}`);
    };

    return (
        <div className='browse-container'>
            <div className='search-container'>
                <div>
                    <input className='search' type='text' id='search' name='search' placeholder='Search...' />
                    <label><input className='radio' type='radio' id='art' name='art' value='ART' />ART</label>
                    <label><input className='radio' type='radio' id='writing' name='writing' value='WRITING' />WRITING</label>
                </div>
                <div className='extra-search'>
                    <input className='extra' type='text' id='tag' name='tag' placeholder='TAGS...' />
                    <input className='extra' type='text' id='genre' name='genre' placeholder='GENRE...' />
                </div>
            </div>

            <div className='browse-character-container'>
                {characters.map(character => (
                    <div key={character._id} className='character' onClick={() => handleCharacterClick(character._id)}>
                        <img className='found-characters' src={character.profileImage || '/images/default.png'} alt={character.name} />
                        <h3>{character.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Browse;
