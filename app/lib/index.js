'use strict';
// const logger = require('./logger');
const TokenServ = require('./token');
const PasswordServ = require('./password');
const errorHandlingMiddleware = require('./error-handling-middleware');
const SendMail = require('./send-mail');
const AuthServ = require('./auth');

module.exports = {
	// logger,
	TokenServ,
	AuthServ,
	PasswordServ,
	SendMail,
	errorHandlingMiddleware,
};