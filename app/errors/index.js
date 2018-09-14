'use strict';
const GeneralErrors = require('./general');
const UserErrors = require('./user');

const errors = Object.assign(
	{},
	GeneralErrors,
	UserErrors,
);

module.exports = errors;