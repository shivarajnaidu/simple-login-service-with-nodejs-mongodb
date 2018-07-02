'use strict';

const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const { User, UserProfiles } = require('../../models');
const { LocalProfile } = UserProfiles;
const { PasswordServ } = require('../../lib');

const {
    NewAccountVerification
} = require('../../helpers/mail');

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

            const profile = new LocalProfile(profileData);
            await profile.save();
            NewAccountVerification.send(otp, email);

            res.json({
                message: 'Verification Email Sent To Your Email Id.. Please Verify Your Email By Clicking The Verification Link'
            });

        } catch (error) {
            next(error);
        }

    })



module.exports = router;