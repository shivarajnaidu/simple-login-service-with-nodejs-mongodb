const db = require('./db');
const User = require('./user');
const UnVerifiedAccount = require('./unverified-account');
const Otp = require('./otp');

module.exports = {
  db,
  User,
  UnVerifiedAccount,
  Otp,
};
