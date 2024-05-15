// server/src/controllers/loginController.js

const db = require('../db');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.getUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        return res.status(200).json({ message: 'Вход выполнен успешно', user });
    } catch (error) {
        console.error('Ошибка при входе пользователя:', error);
        return res.status(500).json({ message: 'Ошибка при входе пользователя' });
    }
};
