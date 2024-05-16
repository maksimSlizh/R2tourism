const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const placesRouter = require('./places');
const usersRouter = require('./users');

router.use('/auth', authRouter);
router.use('/places', placesRouter);
router.use('/users', usersRouter);

module.exports = router;
