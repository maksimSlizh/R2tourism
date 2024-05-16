// server/src/routes/index.js
const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const placesRouter = require('./places');

router.use('/auth', authRouter);
router.use('/places', placesRouter);

module.exports = router;
