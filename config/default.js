'use strict';

const config = {
  db: {
    uri: 'mongodb://localhost:27017/test',
  },

  // JWT Secret
  jwt: {
    secret: (process.env.JWT_SECRET || 'test-jwt-secret'),
    tokenExpirePeriod: (60 * 60 * 1), // 1 day
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },

  // NODE ENV VARIABLES

  PORT: process.env.PORT || 3000,

  IP: '0.0.0.0',

  HOST_ADDR: {
    ui: 'http://localhost:4000',
  },

  PASSWORD_RESET_PATH: '/reset-password',
};

module.exports = config;
