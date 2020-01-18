'use strict';

const express = require('express');

const router = express.Router();
const loginRouter = require('./login');
const signupRouter = require('./signup');
const forgotPasswordRouter = require('./forgot-password');
const resetPasswordRouter = require('./reset-password');
// const googleLoginRouter = require('./google-login');
const otpRouter = require('./otp');

router.use('/login', loginRouter);
// router.use('/google', googleLoginRouter);
router.use('/signup', signupRouter);
router.use('/otp', otpRouter);
router.use('/forgot-password', forgotPasswordRouter);
router.use('/reset-password', resetPasswordRouter);

module.exports = router;
