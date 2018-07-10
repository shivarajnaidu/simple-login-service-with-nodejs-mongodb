'use strict';
const express = require('express');
const router = express.Router();

const usersAccountRouter = require('./account');
// const usersLocalProfileRouter = require('./local-profile');
// const usersFaceBookProfileRouter = require('./fb-profile');
// const usersGoogleProfileRouter = require('./google-profile');

router.use('/', usersAccountRouter);
// router.use('/:userId/profile/local', usersLocalProfileRouter);
// router.use('/:userId/profile/fb', usersFaceBookProfileRouter);
// router.use(usersGoogleProfileRouter);

module.exports = router;