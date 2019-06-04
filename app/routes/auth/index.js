const express = require('express');
const loginRouter = require('./login');
const signupRouter = require('./signup');

const router = express.Router();

// const forgotPasswordRouter = require('./forgot-password');
// const resetPasswordRouter = require('./reset-password');
// const googleLoginRouter = require('./google-login');

router.use('/login', loginRouter);
// router.use('/google', googleLoginRouter);
router.use('/signup', signupRouter);
// router.use('/forgot-password', forgotPasswordRouter);
// router.use('/reset-password', resetPasswordRouter);

module.exports = router;
