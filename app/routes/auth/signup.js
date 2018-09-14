'use strict';

const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const { User, UserProfiles } = require('../../models');
const { LocalProfile } = UserProfiles;
const { PasswordServ, TokenServ } = require('../../lib');
const {
    UserAlreadyExistError,
    InvalidLinkError
} = require('../../errors');

const {
    NewAccountVerification
} = require('../../helpers/mail');

router.route('/')

    .get(async(req, res, next) => {
        const { otp: otpToken } = req.query;
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
            const user = await LocalProfile.findOne({ otp }).exec();
            if (!user || !user.otp) {
                const error = new InvalidLinkError();
                return next(error);
            }

            Object.assign(user, updateObj);
            await user.save();
            res.json({ message: 'Your Account Has Been Verified Successfully.. You Can Login Now..' });
        } catch (error) {
            next(error);
        }


    })


    /**
     * Register New User
     */

    .post(async(req, res, next) => {
        const { body } = req;
        const {
            email,
            name,
        } = body;

        const query = {
            email
        };


        try {
            const user = await User.findOne(query).exec();
            
            // If User With Given Email ID Already Exists Send Error Response
            if (user) {
                const error = new UserAlreadyExistError();
                return next(error);
            }

            const newUser = new User({ email });
            const result = await newUser.save();
            
            const userId = result.id;
            const password = await PasswordServ.hash(body.password);
            const otp = uuid();
            const profileData = {
                userId,
                name,
                password,
                otp
            };

            const otpToken = TokenServ.generate({ otp });
            const profile = new LocalProfile(profileData);
            await profile.save();

            NewAccountVerification.send(await otpToken, email)
                .then(data => {})
                .catch(error => console.error(error));

            res.json({
                message: 'Verification Email Sent To Your Email Id.. Please Verify Your Email By Clicking The Verification Link'
            });

        } catch (error) {
            next(error);
        }

    })



module.exports = router;