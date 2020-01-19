'use strict';

const uuid = require('uuid/v4');

class BadRequestError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

module.exports = {
  BadRequestError,
};
