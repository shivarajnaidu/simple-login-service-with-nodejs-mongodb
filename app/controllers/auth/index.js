'use strict';

const login = require('./login');
const signup = require('./signup');
const {
  resendOtp,
  verifyOtp,
} = require('./otp');

const forgotPassword = require('./forgot-password');
const resetPassword = require('./reset-password');

module.exports = {
  signup,
  login,
  resendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
};
