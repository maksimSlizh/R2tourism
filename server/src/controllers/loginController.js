// server/src/controllers/loginController.js

const db = require('../db');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.getUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'The login was completed successfully', user });
    } catch (error) {
        console.error('User login error:', error);
        return res.status(500).json({ message: 'User login error' });
    }
};
