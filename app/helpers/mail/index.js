'use strict';
const NewAccountVerification = require('./verify-new-user');
const SendPasswordResetMail = require('./send-forgot-password-verification-mail');

module.exports = {
	NewAccountVerification,
	SendPasswordResetMail
}