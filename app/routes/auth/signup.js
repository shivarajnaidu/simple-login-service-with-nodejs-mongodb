'use strict';

const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const { User, UserProfiles } = require('../../models');
const { LocalProfile } = UserProfiles;
const { PasswordServ, TokenServ } = require('../../lib');

const {
    NewAccountVerification
} = require('../../helpers/mail');

const inValidLinkError = (next, message = 'Invalid Link') => {
    const error = new Error(message);
    error.status = 400;
    return next(error);
}

router.route('/')

    .get(async(req, res, next) => {
        const { verify, otp: otpToken } = req.query;
        if (!(verify === 'account') || !otpToken) {
            return inValidLinkError(next);
        }

        const updateObj = {
            otp: undefined,
            isEmailVerified: true
        };

        try {
            const { otp } = await TokenServ.verify(otpToken);
            const user = await LocalProfile.findOne({ otp }).exec();
            if (!user || !user.otp) {
                const message = 'Invalid Link / Link Expired';
                return inValidLinkError(next, message);
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
            role
        } = body;

        const query = {
            email
        };


        try {
            const user = await User.findOne(query).exec();
            const newUser = new User({
                email,
                role
            });

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