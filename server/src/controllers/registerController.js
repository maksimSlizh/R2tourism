// server/src/controllers/registerController.js

const db = require('../db');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await db.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'The user with this email has already been registered' });
        }

        await db.createUser({ username, email, password });

        return res.status(201).json({ message: 'The user has been successfully registered' });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Error during user registration' });
    }
};
