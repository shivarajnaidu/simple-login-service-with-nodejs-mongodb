'use strict';
const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
const signupRouter = require('./signup');
const forgotPasswordRouter = require('./forgot-password');
const resetPasswordRouter = require('./reset-password');

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/forgot-password', forgotPasswordRouter);
router.use('/reset-password', resetPasswordRouter);

module.exports = router;
