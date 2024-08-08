import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './userAccount.css'; 

const UserAccount = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null); // State for handling errors
    const { username } = useParams(); // Get the username from the URL
    const navigate = useNavigate(); // Use navigate from react-router-dom

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                // Fetch user by username to get the user ID
                const userResponse = await axios.get(`http://localhost:6969/users/username/${username}`, { headers });
                const userId = userResponse.data._id; // Extract user ID
                setUser(userResponse.data);

                // Fetch profile by user ID
                const profileResponse = await axios.get(`http://localhost:6969/profiles/${userId}`, { headers });
                setProfile(profileResponse.data);

                // Fetch characters by user ID
                console.log(`Fetching characters for user ID: ${userId}`);
                const charactersResponse = await axios.get(`http://localhost:6969/characters/user/${userId}`, { headers });
                console.log('Characters response:', charactersResponse.data);

                // Verify the correct characters are fetched
                if (charactersResponse.data.some(character => character.user === userId)) {
                    setCharacters(charactersResponse.data);
                } else {
                    console.error('Characters do not match the user ID:', userId);
                }

                // Fetch posts by user ID
                const postsResponse = await axios.get(`http://localhost:6969/posts/user/${userId}`, { headers });
                setPosts(postsResponse.data);

            } catch (error) {
                setError('Error fetching user data');
                console.error('Error fetching user data:', error);
            }
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);

    const handleCharacterClick = (id) => {
        navigate(`/ocpage/${id}`); // Use navigate instead of Navigate
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!user || !profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className='account-container' style={{ backgroundColor: profile.backgroundColor || '#1e1e1e' }}>
            <div className='banner-container'>
                <img src={`http://localhost:6969${profile.bannerImage || '/images/grayblock.png'}`} alt='banner' className='banner' />
                <img src={`http://localhost:6969${profile.profileImage || '/images/unknown.jpg'}`} alt='pfp' className='profile-picture' />
            </div>
            <div className='info-container'>
                <p className='pf-user'>@{user.username}</p>
                {/* <div className='follow-info'>
                    <div className='following'>
                        FOLLOWING
                        <div className='number'>00</div>
                    </div>
                    <div className='followers'>
                        FOLLOWERS
                        <div className='number'>00</div>
                    </div>
                </div> */}
                <div>
                    <h3 className='bio'>BIO</h3>
                    <div className='bio-text'>
                        {profile.bio || 'No bio available'}
                    </div>
                </div>
            </div>
            <div className='character-container'>
                {characters.map(character => (
                    <div key={character._id} className='character-item' onClick={() => handleCharacterClick(character._id)}>
                        <img className='characters' src={character.profileImage || '/images/grayblock.png'} alt={character.name} />
                        <p>{character.name}</p>
                    </div>
                ))}
            </div>
            <div className='posts-container'>
                {posts.map(post => (
                    <div key={post._id} className='item'>
                        <h4 className='ptitle'>{post.title}</h4>
                        <p className='pbody'>{post.body}</p>
                        {post.images && post.images.map((image, index) => (
                            <img key={index} src={`http://localhost:6969${image}`} alt={`Post image ${index}`} className='pimage' />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserAccount;
