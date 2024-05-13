// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Этот маршрут доступен только аутентифицированным пользователям' });
});

module.exports = router;
