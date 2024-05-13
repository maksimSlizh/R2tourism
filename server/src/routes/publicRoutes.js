// routes/publicRoutes.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Этот маршрут доступен для всех пользователей' });
});

module.exports = router;
