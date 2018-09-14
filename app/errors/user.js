'use strict';

const {
	BadRequestError
} = require('./general');


class EmailNotFoundError extends BadRequestError {
	constructor(message) {
		super()
		this.message = 'Email Not Found';
	}
}


class UserNotFoundError extends BadRequestError {
	constructor(message) {
		super()
		this.message = 'User Not Found';
	}
}

class IncorrectPassword extends BadRequestError {
	constructor(message) {
		super()
		this.message = 'Incorrect Password';
	}
}

class UserAlreadyExist extends BadRequestError {
	constructor(message) {
		super()
		this.message = 'User Already Exist';
	}
}

module.exports = {
	EmailNotFoundError,
	UserNotFoundError,
	IncorrectPassword,
	UserAlreadyExist
};