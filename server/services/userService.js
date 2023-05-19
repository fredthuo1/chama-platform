const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../models/User');
const userUtils = require('../utils/userUtils');

dotenv.config();

const userService = {
    registerUser: async (email, password) => {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email is already registered');
            }

            const isEmailValid = userUtils.validateEmail(email);
            if (!isEmailValid) {
                throw new Error('Invalid email format');
            }

            const isPasswordValid = userUtils.validatePassword(password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            const hashedPassword = await userUtils.hashPassword(password);
            const newUser = new User({ email, password: hashedPassword });

            await newUser.save();
        } catch (error) {
            throw new Error('User registration failed');
        }
    },

    loginUser: async (email, password) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }

            const isPasswordValid = await userUtils.comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return token;
        } catch (error) {
            throw new Error('User login failed');
        }
    }
};

module.exports = userService;
