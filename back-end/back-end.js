const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, Profile } = require('./dal/mongo-dal');

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// User creation route
app.post('/users', async (req, res) => {
    try {
        console.log('Received request:', req.body); // Log the request body
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        console.log('User created:', user); // Log the created user
        res.status(201).send(user);
    } catch (error) {
        console.error('Error creating user:', error); // Log the error
        res.status(400).send(error);
    }
});

// Profile creation route
app.post('/profiles', async (req, res) => {
    try {
        console.log('Received request:', req.body); // Log the request body
        const { user, profileImage, bannerImage, bio, backgroundColor } = req.body;
        const profile = new Profile({ user, profileImage, bannerImage, bio, backgroundColor });
        await profile.save();
        console.log('Profile created:', profile); // Log the created profile
        res.status(201).send(profile);
    } catch (error) {
        console.error('Error creating profile:', error); // Log the error
        res.status(400).send(error);
    }
});

// Read all users route
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(400).send(error);
    }
});

// Read users by username route
app.get('/users/username/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const users = await User.find({ username: new RegExp(username, 'i') });
        if (users.length === 0) {
            return res.status(404).send({ message: 'No users found' });
        }
        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users by username:', error);
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb+srv://mmitchell:Tuff12top@cluster0.fm4mkz2.mongodb.net/CharacterCove')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));