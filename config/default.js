'use strict';

module.exports = {
  DB_URL: 'mongodb://localhost:27017/test',


  // JWT Secret
  JWT_SECRET: (process.env.JWT_SECRET || 'test-jwt-secret'),
  JWT_LIFETIME: (60 * 60 * 1), // 1 day

  PORT: process.env.PORT || 3000,
  IP: '0.0.0.0',
};
