const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Неверный токен' });
  }
};

module.exports = authMiddleware;
