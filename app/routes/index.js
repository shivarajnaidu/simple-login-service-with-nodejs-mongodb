'use strict';

const usersRouter = require('./users');
const authRouter = require('./auth');

module.exports = app => {
    app.use('/api/auth/', authRouter);
    app.use('/api/users', usersRouter);

    app.use((error, req, res, next) => {
        const message = error.message || 'Something Went Wrong';
        res.status(500).json({message})
    });

};