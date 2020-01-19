'use strict';

const GeneralErrors = require('./general');
const UserErrors = require('./user');

const errors = {
  ...GeneralErrors,
  ...UserErrors,
};

module.exports = errors;
