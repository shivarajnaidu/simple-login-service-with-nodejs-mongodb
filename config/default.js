'use strict';

const config = {
	db: {
		uri: 'mongodb://localhost/test'
	},

	// JWT Secret
	jwt: {
		secret: (process.env.JWT_SECRET || 'test-jwt-secret'),
		tokenExpirePeriod: (60 * 60 * 1)  // 1 day
	},

	// Node MAiler
	nodemailer: {
		user: 'example@gmail.com',
		password: 'example'
	},

	// NODE ENV VARIABLES

	PORT: process.env.PORT || 3000

};

module.exports = config;
