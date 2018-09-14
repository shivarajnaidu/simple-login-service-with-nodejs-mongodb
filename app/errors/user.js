'use strict';

const {
	BadRequestError
} = require('./general');


class EmailNotFoundError extends BadRequestError {
	constructor(message = 'Email Not Found') {
		super(message)
	}
}


class UserNotFoundError extends BadRequestError {
	constructor(message = 'User Not Found') {
		super(message)
	}
}

class IncorrectPasswordError extends BadRequestError {
	constructor(message = 'Incorrect Password') {
		super(message)
	}
}

class UserAlreadyExistError extends BadRequestError {
	constructor(message = 'User Already Exist') {
		super(message)
	}
}

class EmailNotVerifiedError extends BadRequestError {
	constructor(message = 'You Should Verify Your Email ID To Login') {
		super(message)
	}
}

class InvalidLinkError extends BadRequestError {
	constructor(message = 'Invalid Link / Link Expired') {
		super(message)
	}
}

module.exports = {
	EmailNotFoundError,
	UserNotFoundError,
	IncorrectPasswordError,
	UserAlreadyExistError,
	EmailNotVerifiedError,
	InvalidLinkError
};