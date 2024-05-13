const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.getUserByEmail(email);
        if (!user || user.password !== password) {
            res.status(401).json({ message: 'Invalid email or password' });
        } else {
            res.status(200).json({ message: 'Login successful', user });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
});

module.exports = router;
