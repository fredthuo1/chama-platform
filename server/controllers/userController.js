const userService = require('../services/userService');

const userController = {
    register: async (req, res) => {
        const { email, password } = req.body;

        try {
            await userService.registerUser(email, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const token = await userService.loginUser(email, password);
            res.status(200).json({ message: 'User logged in successfully', token });
        } catch (error) {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    }
};

module.exports = userController;
