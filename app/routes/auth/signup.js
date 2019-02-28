'use strict';

const uuid = require('uuid/v4');
const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const { PasswordServ, TokenServ } = require('../../lib');
const {
    UserAlreadyExistError,
    InvalidLinkError,
    UserNotFoundError
} = require('../../errors');

const {
    NewAccountVerification
} = require('../../helpers/mail');

router.route('/')

    .get(async (req, res, next) => {
        const { otp: otpToken, email } = req.query;
        if (!otpToken) {
            const error = new InvalidLinkError();
            return next(error);
        }

        const updateObj = {
            otp: undefined,
            isEmailVerified: true
        };

        try {
            const { otp } = await TokenServ.verify(otpToken);
            const user = await User.findOne({ email }).exec();
            if (!user) {
                const error = new UserNotFoundError();
                return next(error);
            }

            const localProfile = user.profiles.find(profile => profile.provider === 'local');

            if (!localProfile || !localProfile.otp) {
                const error = new InvalidLinkError();
                return next(error);
            }

            if (localProfile.otp === otp) {
                Object.assign(localProfile, updateObj)
                user.markModified('profiles');
                await user.save();
                res.json({ message: 'Your Account Has Been Verified Successfully.. You Can Login Now..' });
            }

        } catch (error) {
            next(error);
        }


    })


    /**
     * Register New User
     */

    .post(async (req, res, next) => {
        const { body } = req;
        const {
            email,
            name,
        } = body;

        try {
            const user = await User.findOne({ email }).exec();

            // If User With Given Email ID Already Exists Send Error Response
            if (user) {
                const error = new UserAlreadyExistError();
                return next(error);
            }

            const password = await PasswordServ.hash(body.password);
            const otp = uuid();
            const localProfile = {
                name,
                password,
                otp,
                provider: 'local',
                isEmailVerified: false,
            };

            const newUser = new User({ email, profiles: [localProfile] });
            await newUser.save();

            const otpToken = TokenServ.generate({ otp });
            NewAccountVerification.send(await otpToken, email)
                .then(data => { })
                .catch(error => console.error(error));

            res.json({
                message: 'Verification Email Sent To Your Email Id.. Please Verify Your Email By Clicking The Verification Link'
            });

        } catch (error) {
            next(error);
        }

    })



module.exports = router;