const express = require('express');
const authRouter = require('./auth');
const placesRouter = require('./places');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/places', placesRouter);

module.exports = router;
