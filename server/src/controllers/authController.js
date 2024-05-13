const User = require('../models/User');

const register = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};

module.exports = { register, login };
