'use strict';
const { errorHandlingMiddleware } = require('../lib');
const usersRouter = require('./users');
const authRouter = require('./auth');

module.exports = app => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', usersRouter);
    app.use(errorHandlingMiddleware);
};