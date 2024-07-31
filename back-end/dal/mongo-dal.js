const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pfp: String,
    bio: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const characterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: null
    },
    height: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    pronouns: {
        type: String,
        default: ''
    },
    nickname: {
        type: String,
        default: ''
    },
    birthPlace: {
        type: String,
        default: '',
    },
    currentResidence: {
        type: String,
        default: '',
    },
    family: {
        type: String,
        default: '',
    },
    occupation: {
        type: String,
        default: '',
    },
    tags: {
        type: [String],
        default: [],
    },
    personality: {
        type: String,
        default: '',
    },
    appearance: {
        type: String,
        default: '',
    },
    history: {
        type: String,
        default: '',
    },
    images: [{
        src: String,
        type: {
            type: String,
            enum: ['url', 'file'],
        },
    }],
    profileImage: {
        type: String,
        default: ''
    },
    bannerImage: {
        type: String,
        default: ''
    },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['art', 'writing'],
        required: true,
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    images: {
        type: [String], 
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['follow', 'comment', 'like'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fields: [{
        fieldName: {
            type: String,
            required: true,
        },
        fieldType: {
            type: String,
            enum: ['text', 'textarea', 'image', 'select'],
            required: true,
        },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const profileSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  profileImage: {
      type: String,
      required: true
  },
  bannerImage: {
      type: String,
      required: true
  },
  bio: {
      type: String,
      required: true
  },
  backgroundColor: {
      type: String,
  }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
const User = mongoose.model('User', userSchema);
const Character = mongoose.model('Character', characterSchema);
const Post = mongoose.model('Post', postSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const Template = mongoose.model('Template', templateSchema);

module.exports = {
    User,
    Character,
    Post,
    Notification,
    Template,
    Profile
};
