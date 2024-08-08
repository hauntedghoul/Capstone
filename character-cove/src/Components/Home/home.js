import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:6969/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:6969/all-profiles');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        const profilesMap = data.reduce((acc, profile) => {
          acc[profile.user] = profile;  // Use profile.user as the key for easier access
          return acc;
        }, {});
        setProfiles(profilesMap);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchPosts();
    fetchProfiles();
  }, []);

  return (
    <div className='posts'>
      {posts.map(post => (
        <div className='post' key={post._id}>
          <div className='username'>
            <Link to={`/users/${post.user.username}`} className='userpfp'>
              {profiles[post.user._id] && (
                <img 
                  src={`http://localhost:6969${profiles[post.user._id].profileImage}`} 
                  className='pfp' 
                  alt='Profile' 
                  onError={(e) => e.target.src = '/images/unknown.jpg'} // Fallback image
                />
              )}
            </Link>
            <h3 className='user'>@{post.user.username}</h3>
          </div>
          <div className='content'>
            <p>{post.body}</p>
          </div>
          {post.images.length > 0 && (
            <div className='postimage'>
              {post.images.map((image, index) => (
                <img src={image.startsWith('http') ? image : `http://localhost:6969${image}`} alt={`post-${index}`} key={index} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
