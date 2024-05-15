// server/src/controllers/registerController.js

const db = require('../db');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await db.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с этим email уже зарегистрирован' });
        }

        await db.createUser({ username, email, password });

        return res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        return res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
    }
};
