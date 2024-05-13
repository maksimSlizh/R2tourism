const db = require('../db');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await db.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с этим email уже зарегистрирован' });
        }
        await db.createUser({ username, email, password });
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.getUserByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }
        res.status(200).json({ message: 'Вход выполнен успешно', user });
    } catch (error) {
        console.error('Ошибка при входе пользователя:', error);
        res.status(500).json({ message: 'Ошибка при входе пользователя' });
    }
};

exports.getUserProfile = async (req, res) => {
    const userId = req.user.id; 
    try {
        const user = await db.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Ошибка при получении профиля пользователя:', error);
        res.status(500).json({ message: 'Ошибка при получении профиля пользователя' });
    }
};
