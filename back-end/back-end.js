const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { User, Profile, Character } = require('./dal/mongo-dal');
const authenticateUser = require('./middelware/authenticate');

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase the payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Specify the directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Set the file name to be unique
    }
});

const upload = multer({ storage: storage });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb+srv://mmitchell:Tuff12top@cluster0.fm4mkz2.mongodb.net/CharacterCove')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// User creation route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password with 10 salt rounds
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('Raw password:', password);
    console.log('Hashed password during signup:', hashedPassword);

    const user = new User({ username, email, password: hashedPassword });
    user.save()
        .then(() => {
            const token = jwt.sign({ id: user._id, username: user.username }, 'deadpool', { expiresIn: '1h' });
            res.status(201).send({ user, token });
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            res.status(400).send(error);
        });
});

// Profile creation route
app.post('/profiles', authenticateUser, upload.fields([{ name: 'profileImage' }, { name: 'bannerImage' }]), async (req, res) => {
    try {
        const { bio, backgroundColor } = req.body;
        const profileImage = `/uploads/${req.files['profileImage'][0].filename}`;
        const bannerImage = `/uploads/${req.files['bannerImage'][0].filename}`;

        console.log('Profile Image Path:', profileImage);
        console.log('Banner Image Path:', bannerImage);

        const profile = new Profile({
            user: req.user.id,
            profileImage,
            bannerImage,
            bio,
            backgroundColor
        });

        await profile.save();
        res.status(201).send(profile);
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(400).send(error);
    }
});

// Read profile route
app.get('/profiles/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const profile = await Profile.findOne({ user: new ObjectId(userId) });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
        console.log(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Read users by username route
app.get('/users/:username', authenticateUser, async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      res.status(200).send(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
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
// Update profile route
app.put('/profiles/:userId', authenticateUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedProfile = await Profile.findOneAndUpdate(
            { user: userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).send({ message: 'Profile not found' });
        }

        res.status(200).send(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(400).send(error);
    }
});

// Delete profile route
app.delete('/profiles/:userId', authenticateUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedProfile = await Profile.findOneAndDelete({ user: userId });

        if (!deletedProfile) {
            return res.status(404).send({ message: 'Profile not found' });
        }

        res.status(200).send(deletedProfile);
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(400).send(error);
    }
});

// Update user route
app.put('/users', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the authenticated user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).send(error);
    }
});

// Delete user route
app.delete('/delete/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const deletedUser = await User.findOneAndDelete(
            { username: new RegExp(username, 'i') }
        );
        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).send(error);
    }
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });

    User.findOne({ username: new RegExp(`^${username}$`, 'i') })
        .then((user) => {
            if (!user) {
                console.error('User not found:', username);
                return res.status(404).send({ message: 'User not found' });
            }

            console.log('User found:', user);
            console.log('Submitted password:', password);
            console.log('Stored hashed password:', user.password);

            // Compare the raw password with the hashed password
            const isMatch = bcrypt.compareSync(password, user.password);
            console.log('Password comparison result:', isMatch);

            // if (!isMatch) {
            //     console.error('Invalid credentials for user:', username);
            //     return res.status(400).send({ message: 'Invalid credentials' });
            // }

            const token = jwt.sign({ id: user._id, username: user.username }, 'deadpool', { expiresIn: '1h' });
            console.log('Generated token:', token);

            res.status(200).send({ user, token });
            console.log('User logged in:', user);
        })
        .catch((error) => {
            console.error('Error logging in:', error);
            res.status(400).send(error);
        });
});

// Create character route
app.post('/characters', authenticateUser, async (req, res) => {
    try {
        const {
            name, quote, birthday, age, height, gender, pronouns, nickname, birthPlace,
            currentResidence, family, occupation, tags, personality, appearance, history,
            images, profileImage, bannerImage
        } = req.body;
        
        const character = new Character({
            user: req.user.id,
            name,
            quote,
            birthday,
            age,
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
            bannerImage
        });
        
        await character.save();
        res.status(201).send(character);
    } catch (error) {
        console.error('Error creating character:', error);
        res.status(400).send(error);
    }
});

// Get all characters for the authenticated user
app.get('/characters', authenticateUser, async (req, res) => {
    try {
        const characters = await Character.find({ user: req.user.id });
        console.log(characters); // Log the response to check image paths
        res.status(200).send(characters);
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(400).send(error);
    }
});

// Get a specific character by ID
app.get('/characters/:id', async (req, res) => {
    try {
        const characterId = req.params.id;
        const character = await Character.findById(characterId);

        if (!character) {
            return res.status(404).send({ message: 'Character not found' });
        }

        res.status(200).send(character);
    } catch (error) {
        console.error('Error fetching character:', error);
        res.status(400).send(error);
    }
});

// Update character route
app.put('/characters/:id', authenticateUser, async (req, res) => {
    try {
        const characterId = req.params.id;
        const updatedCharacter = await Character.findOneAndUpdate(
            { _id: characterId, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCharacter) {
            return res.status(404).send({ message: 'Character not found' });
        }

        res.status(200).send(updatedCharacter);
    } catch (error) {
        console.error('Error updating character:', error);
        res.status(400).send(error);
    }
});

// Delete character route
app.delete('/characters/:id', authenticateUser, async (req, res) => {
    try {
        const characterId = req.params.id;
        const deletedCharacter = await Character.findOneAndDelete({ _id: characterId, user: req.user.id });

        if (!deletedCharacter) {
            return res.status(404).send({ message: 'Character not found' });
        }

        res.status(200).send(deletedCharacter);
    } catch (error) {
        console.error('Error deleting character:', error);
        res.status(400).send(error);
    }
});

// Get all characters sorted by creation date
app.get('/all-characters', async (req, res) => {
    try {
        const characters = await Character.find().sort({ createdAt: -1 });
        res.status(200).send(characters);
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(400).send(error);
    }
});