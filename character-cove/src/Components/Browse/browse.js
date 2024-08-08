import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './browse.css';

const Browse = () => {
    const [characters, setCharacters] = useState([]);
    const [posts, setPosts] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('characters'); // Default search type
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch characters by default
                const charactersResponse = await axios.get('http://localhost:6969/all-characters');
                setCharacters(charactersResponse.data);

                // Fetch posts and users based on search type
                if (searchType === 'posts' || searchType === 'all') {
                    const postsResponse = await axios.get('http://localhost:6969/posts');
                    setPosts(postsResponse.data);
                }
                if (searchType === 'users' || searchType === 'all') {
                    const profilesResponse = await fetch('http://localhost:6969/all-profiles');
                    if (profilesResponse.ok) {
                        const profilesData = await profilesResponse.json();
                        const profilesMap = profilesData.reduce((acc, profile) => {
                            acc[profile.user] = profile;
                            return acc;
                        }, {});
                        setProfiles(profilesMap);
                    }

                    const usersResponse = await fetch('http://localhost:6969/users');
                    if (usersResponse.ok) {
                        const usersData = await usersResponse.json();
                        setUsers(usersData);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchType]);

    const handleCharacterClick = (id) => {
        navigate(`/ocpage/${id}`);
    };

    const handleUserClick = (username) => {
        navigate(`/users/${username}`);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:6969/search', {
                params: {
                    keyword: searchQuery,
                    type: searchType,
                },
            });

            if (searchType === 'characters' || searchType === 'all') {
                setCharacters(response.data.characters || []);
            }
            if (searchType === 'posts' || searchType === 'all') {
                setPosts(response.data.posts || []);
            }
            if (searchType === 'users' || searchType === 'all') {
                const usersResponse = await fetch('http://localhost:6969/users');
                if (!usersResponse.ok) {
                    throw new Error('Network response was not ok.');
                }
                const usersData = await usersResponse.json();
                setUsers(usersData);
            }
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div className='browse-container'>
            <div className='search-container'>
                <input
                    className='search'
                    type='text'
                    id='search'
                    name='search'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div>
                    <label><input className='radio' type='radio' name='searchType' value='characters' checked={searchType === 'characters'} onChange={() => setSearchType('characters')} /> Characters</label>
                    <label><input className='radio' type='radio' name='searchType' value='posts' checked={searchType === 'posts'} onChange={() => setSearchType('posts')} /> Posts</label>
                    <label><input className='radio' type='radio' name='searchType' value='users' checked={searchType === 'users'} onChange={() => setSearchType('users')} /> Users</label>
                </div>
                <button className='edit-button-bottom' onClick={handleSearch}>Search</button>
            </div>

            <div className='browse-character-container'>
                {searchType === 'characters' && characters.map(character => (
                    <div key={character._id} className='character' onClick={() => handleCharacterClick(character._id)}>
                        <img 
                            className='found-characters' 
                            src={character.profileImage || '/images/grayblock.png'} 
                            alt={character.name} 
                            onError={(e) => e.target.src = '/images/grayblock.png'} 
                        />
                        <h3>{character.name}</h3>
                    </div>
                ))}
                {searchType === 'posts' && posts.map(post => (
                    <div key={post._id} className='post'>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        {post.images.length > 0 && (
                            <div className='postimage'>
                                {post.images.map((image, index) => (
                                    <img key={index} src={image.startsWith('http') ? image : `http://localhost:6969${image}`} alt={`Post image ${index + 1}`} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {searchType === 'users' && users.map(user => (
                    <div key={user._id} className='user' onClick={() => handleUserClick(user.username)}>
                        <img 
                            className='user-profile-image' 
                            src={`http://localhost:6969${profiles[user._id]?.profileImage || '/images/unknown.jpg'}`} 
                            alt={user.username} 
                            onError={(e) => e.target.src = '/images/unknown.jpg'}
                        />
                        <h3>{user.username}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Browse;
