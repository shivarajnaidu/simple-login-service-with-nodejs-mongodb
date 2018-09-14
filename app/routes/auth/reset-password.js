'use strict';

const uuid = require('uuid');
const express = require('express');
const router = express.Router();

const { User, UserProfiles } = require('../../models');
const { LocalProfile } = UserProfiles;
const { PasswordServ, TokenServ } = require('../../lib');
const {
    InvalidLinkError
} = require('../../errors');

router.route('/')


    /**
     * Login
     * 
     */

    .post(async(req, res, next) => {
        const { 
            otp: otpToken,
            password: plainPassword
        } = req.body;

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

            const password = await PasswordServ.hash(plainPassword);
            Object.assign(user, updateObj, { password });
            await user.save();
            res.json({ message: 'Password Updated Successfully' });
        } catch (error) {
            next(error);
        }
    })



module.exports = router;