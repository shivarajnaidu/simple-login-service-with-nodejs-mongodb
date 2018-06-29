'use strict';

const express = require('express');
const router = express.Router();

const { User, UserProfiles } = require('../../models');
const { LocalProfile } = UserProfiles;
const { PasswordServ, TokenServ } = require('../../lib');

router.route('/')


    /**
     * Login
     * 
     */

    .post(async(req, res, next) => {

        const {
            email,
            password
        } = req.body;

        try {
            const user = await User.findOne({ email }).exec();

            if (!user) {
                const error = new Error('User With Given Email ID Not Exist');
                error.status = 400;
                return next(error);
            }

            const profile = await LocalProfile.findOne({ userId: user.id }).exec();

            if (profile.isEmailVerified) {
                const error = new Error('You Should Verify Your Email ID To Login');
                error.status = 401;
                return next(error);
            }

            const isCorrectPassword = await PasswordServ.match(password, profile.password);

            if (!isCorrectPassword) {
                const error = new Error('Incorrect Password');
                error.status = 401;
                return next(error);
            }

            const tokenData = {
                email,
                provider: profile.provider,
                userId: user.id,
                profileId: profile.id
            };

            const token = await TokenServ.generate(tokenData);
            res.json({ token });

        } catch (error) {
            next(error);
        }

    })



module.exports = router;