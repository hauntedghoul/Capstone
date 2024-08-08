import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './browse.css';

const Browse = () => {
    const [characters, setCharacters] = useState([]);
    const [posts, setPosts] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('characters'); // Default search type
    const [error, setError] = useState(null); // State to handle errors
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
                    
                    // Fetch profiles if the search type is posts
                    const profilesResponse = await axios.get('http://localhost:6969/all-profiles');
                    const profilesMap = profilesResponse.data.reduce((acc, profile) => {
                        acc[profile.user] = profile;
                        return acc;
                    }, {});
                    setProfiles(profilesMap);
                }
                if (searchType === 'users' || searchType === 'all') {
                    const profilesResponse = await axios.get('http://localhost:6969/all-profiles');
                    const profilesMap = profilesResponse.data.reduce((acc, profile) => {
                        acc[profile.user] = profile;
                        return acc;
                    }, {});
                    setProfiles(profilesMap);

                    const usersResponse = await axios.get('http://localhost:6969/users');
                    setUsers(usersResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch initial data.');
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
            if (searchQuery.trim() === '') {
                const defaultFetches = [];

                if (searchType === 'characters' || searchType === 'all') {
                    defaultFetches.push(axios.get('http://localhost:6969/all-characters').then(response => {
                        setCharacters(response.data);
                    }));
                }

                if (searchType === 'posts' || searchType === 'all') {
                    defaultFetches.push(axios.get('http://localhost:6969/posts').then(async (response) => {
                        setPosts(response.data);
                        
                        // Fetch profiles for posts search
                        const profilesResponse = await axios.get('http://localhost:6969/all-profiles');
                        const profilesMap = profilesResponse.data.reduce((acc, profile) => {
                            acc[profile.user] = profile;
                            return acc;
                        }, {});
                        setProfiles(profilesMap);
                    }));
                }

                if (searchType === 'users' || searchType === 'all') {
                    defaultFetches.push(
                        fetch('http://localhost:6969/all-profiles').then(response => response.json()).then(profilesData => {
                            const profilesMap = profilesData.reduce((acc, profile) => {
                                acc[profile.user] = profile;
                                return acc;
                            }, {});
                            setProfiles(profilesMap);
                        })
                    );
                    defaultFetches.push(
                        fetch('http://localhost:6969/users').then(response => response.json()).then(usersData => {
                            setUsers(usersData);
                        })
                    );
                }

                // Wait for all default data to be fetched
                await Promise.all(defaultFetches);
            } else {
                // Perform the search if the query is not empty
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
                    
                    // Fetch profiles for posts search
                    const profilesResponse = await axios.get('http://localhost:6969/all-profiles');
                    const profilesMap = profilesResponse.data.reduce((acc, profile) => {
                        acc[profile.user] = profile;
                        return acc;
                    }, {});
                    setProfiles(profilesMap);
                }
                if (searchType === 'users' || searchType === 'all') {
                    setUsers(response.data.users || []);
                }
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

            {error && <p className='error-message'>{error}</p>}

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
                    <div className='spost'>
                    <div key={post._id} className='post'>
                        <div className='username'>
                            <Link to={`/users/${post.user.username}`} className='userpfp'>
                                {profiles[post.user._id] && (
                                    <img
                                        src={`http://localhost:6969${profiles[post.user._id].profileImage}`}
                                        className='pfp'
                                        alt='Profile'
                                        onError={(e) => e.target.src = '/images/unknown.jpg'} 
                                    />
                                )}
                            </Link>
                            <h3 className='user'>@{post.user.username}</h3>
                        </div>
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
