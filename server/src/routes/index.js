const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.use('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
