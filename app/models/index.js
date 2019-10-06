const db = require('./db');
const User = require('./user');
const UserProfiles = require('./profiles');
const UnVerifiedAccount = require('./unverified-account');
const OtpList = require('./otp-list');

module.exports = {
	db,
	User,
	UserProfiles,
	UnVerifiedAccount,
	OtpList,
};