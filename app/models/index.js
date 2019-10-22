const db = require('./db');
const User = require('./user');
const UnVerifiedAccount = require('./unverified-account');
const Otp = require('./otp');
const AccessToken = require('./access-token');

module.exports = {
  db,
  User,
  UnVerifiedAccount,
  Otp,
  AccessToken
};
