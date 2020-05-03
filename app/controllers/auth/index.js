'use strict';

const login = require('./login');
const signup = require('./signup');
const verifyEmail = require('./verify-email');
const verifyMobile = require('./verify-mobile');

module.exports = {
  login,
  signup,
  verifyEmail,
  verifyMobile,
};
