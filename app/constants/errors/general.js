'use strict';

const { v4: uuid } = require('uuid');

class BadRequestError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

class InvalidLinkError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

module.exports = {
  BadRequestError,
  InvalidLinkError,
};
