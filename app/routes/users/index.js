'use strict';
const express = require('express');
const router = express.Router();

const usersAccountRouter = require('./account');

router.use('/', usersAccountRouter);

module.exports = router;