'use strict';

const express = require('express');
const router = express.Router();

const { User } = require('../../models');
const { PasswordServ } = require('../../lib');


router.route('/')


    /**
     * Register New User
     */

    .post(async(req, res, next) => {
        const { body } = req;
        const {
            email,
            name,
            role
        } = body;

        const query = {
        	email
        };


        try {
            const user = await User.findOne(query).exec();

            if (user) {
                const error = new Error('User With Same Name/Email Already Exist');
                error.status = 409;
                return next(error);
            }

            let data = {
                email,
                name
            };

            if (role) {
                data = Object.assign({}, data, { role });
            }

            const password = await PasswordServ.hash(body.password);
            data = Object.assign({}, data, { password })

            const newUser = new User(data);
            const result = await newUser.save();
            res.json(result);
        } catch (error) {
            next(error);
        }

    })



module.exports = router;