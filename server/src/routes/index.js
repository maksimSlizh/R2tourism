const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.use('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;

// Here we can add more routes
// For example:
// const authRouter = require('./auth');
// const usersRouter = require('./users');
// const placesRouter = require('./places');
// const eventsRouter = require('./events');
// router.use('/auth', authRouter);
// router.use('/users', usersRouter);
// router.use('/places', placesRouter);
// router.use('/events', eventsRouter);
