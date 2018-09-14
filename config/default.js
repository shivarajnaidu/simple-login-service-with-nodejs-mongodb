'use strict';

const config = {
	db: {
		uri: 'mongodb://localhost:27017/test'
	},

	// JWT Secret
	jwt: {
		secret: (process.env.JWT_SECRET || 'test-jwt-secret'),
		tokenExpirePeriod: (60 * 60 * 1)  // 1 day
	},

	// NODE ENV VARIABLES

	PORT: process.env.PORT || 3000,

	IP: '0.0.0.0',

	HOST_ADDR: {
		ui: 'http://localhost:4000'
	},

	PASSWORD_RESET_PATH: '/reset-password'
};

module.exports = config;
