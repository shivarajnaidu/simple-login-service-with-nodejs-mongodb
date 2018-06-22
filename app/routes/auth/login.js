'use strict';

const express = require('express');
const router = express.Router();

const { User } = require('../../models');
const { PasswordServ, TokenServ } = require('../../lib');

router.route('/')


    /**
     * Login
     * 
     */

    .post(async(req, res, next) => {
        const { body } = req;

        const {
            email,
            password
        } = body;

        const query = {
            email
        };


        try {
            const user = await User.findOne(query).exec();

            if (!user) {
                const error = new Error('Invalid Mobile No');
                error.status = 401;
                return next(error);
            }

            const isCorrectPassword = await PasswordServ.match(password, user.password);

            if (!isCorrectPassword) {
                const error = new Error('Incorrect Password');
                error.status = 401;
                return next(error);
            }

            const {
                email,
                id
            } = user;

            const token = await TokenServ.generate({
                email,
                id
            });
            
            res.json({ token });
        } catch (error) {
            next(error);
        }

    })



module.exports = router;