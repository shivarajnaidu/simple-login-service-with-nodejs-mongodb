'use strict';
// const logger = require('./logger');
const TokenServ = require('./token');
const PasswordServ = require('./password');
const errorHandlingMiddleware = require('./error-handling-middleware');


module.exports = {
	// logger,
	TokenServ,
	PasswordServ,
	errorHandlingMiddleware
};