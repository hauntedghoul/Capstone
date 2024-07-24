import React, { useState, useEffect } from 'react';
import './account.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Account = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [userData, setUserData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;

        const userResponse = await axios.get(`http://localhost:6969/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const profileResponse = await axios.get(`http://localhost:6969/profiles/${userResponse.data._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(userResponse.data);
        setUsername(userResponse.data.username);
        setBio(profileResponse.data.bio);
        setProfileImage(profileResponse.data.profileImage);
        setBannerImage(profileResponse.data.bannerImage);

        console.log('Profile Image URL:', `http://localhost:6969${profileResponse.data.profileImage}`);
        console.log('Banner Image URL:', `http://localhost:6969${profileResponse.data.bannerImage}`);

        // Fetch user characters
        const charactersResponse = await axios.get(`http://localhost:6969/characters?userId=${userResponse.data._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCharacters(charactersResponse.data);

      } catch (error) {
        console.error('Error fetching user or profile data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='account-container'>
      <div className='banner-container'>
        <img src={bannerImage ? `http://localhost:6969${bannerImage}` : '/images/default-banner.png'} alt='banner' className='banner' />
        <img src={profileImage ? `http://localhost:6969${profileImage}` : '/images/default-profile.jpg'} alt='pfp' className='profile-picture' />
        <Link to="/edit">
          <button className='edit-button'>Edit</button>
        </Link>
        <button className='logout-button' onClick={handleLogout}>Logout</button>
      </div>
      <div className='info-container'>
        <p className='pf-user'>@{username}</p>
        <div className='follow-info'>
          <div className='following'>
            FOLLOWING
            <div className='number'>00</div>
          </div>
          <div className='followers'>
            FOLLOWERS
            <div className='number'>00</div>
          </div>
        </div>
        <div>
          <h3 className='bio'>BIO</h3>
          <div className='bio-text'>
            {bio}
          </div>
        </div>
      </div>
      <div className='character-container'>
        {characters.map(character => (
          <div key={character._id} className='character-item'>
            <Link to={`/ocpage/${character._id}`}>
              <img className='characters' src={character.profileImage } alt={character.name} />
            </Link>
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Account;
