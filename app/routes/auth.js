'use strict';

const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.route('/signup')
  .post(authController.signup);

router.route('/login')
  .post(authController.login);

router.route('/otp/:id/resend')
  .post(authController.resendOtp);

router.route('/otp/:id')
  .post(authController.verifyOtp);


router.route('/forgot-password')
  .post(authController.forgotPassword);

router.route('/reset-password')
  .post(authController.resetPassword);

module.exports = router;
