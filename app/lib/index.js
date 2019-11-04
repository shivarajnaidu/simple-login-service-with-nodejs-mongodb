

// const logger = require('./logger');
const TokenServ = require('./token');
const PasswordServ = require('./password');
const errorHandlingMiddleware = require('./error-handling-middleware');
const SendMail = require('./send-mail');
const AuthServ = require('./auth');
const OtpServ = require('./send-otp');

module.exports = {
	// logger,
	TokenServ,
	AuthServ,
	PasswordServ,
	SendMail,
	errorHandlingMiddleware,
	OtpServ,
};
