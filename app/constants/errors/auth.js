'use strict';

const { v4: uuid } = require('uuid');

class InvalidCredidentialsError extends Error {
  constructor(message = 'Invalid Credidentials', status = 401) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

class EmailNotVerifiedError extends Error {
  constructor(message = 'Email Not Verified', status = 401) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

class PermissionDeniedError extends Error {
  constructor(message = 'You Don\'t Have Permission To Perform This Operation', status = 403) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

module.exports = {
  InvalidCredidentialsError,
  EmailNotVerifiedError,
  PermissionDeniedError,
};
