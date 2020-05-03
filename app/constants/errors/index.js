'use strict';

const general = require('./general');
const auth = require('./auth');

module.exports = {
  ...general,
  ...auth,
};
