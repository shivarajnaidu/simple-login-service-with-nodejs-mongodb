/* eslint-disable no-console */
/* eslint-disable consistent-return */


const uuid = require('uuid');
const express = require('express');

const router = express.Router();
const { User, UnVerifiedAccount } = require('../../models');
const { PasswordServ, TokenServ, OtpServ } = require('../../lib');
const {
  UserAlreadyExistError,
  InvalidLinkError,
} = require('../../errors');

const {
  NewAccountVerification,
} = require('../../helpers/mail');


const findUser = (req) => {
  const {
    email,
    mobile,
  } = req.body;

  if (mobile) {
    return User.findOne({ mobile }).exec();
  }

  if (email) {
    return User.findOne({ email }).exec();
  }
};

router.route('/')

  // .get(async (req, res, next) => {
  //   const { otp: otpToken } = req.query;
  //   if (!otpToken) {
  //     const error = new InvalidLinkError();
  //     return next(error);
  //   }

  //   const updateObj = {
  //     otp: undefined,
  //     isEmailVerified: true,
  //   };

  //   try {
  //     const { otp } = await TokenServ.verify(otpToken);
  //     const user = await LocalProfile.findOne({ otp }).exec();
  //     if (!user || !user.otp) {
  //       const error = new InvalidLinkError();
  //       return next(error);
  //     }

  //     Object.assign(user, updateObj);
  //     await user.save();
  //     res.json({ message: 'Your Account Has Been Verified Successfully.. You Can Login Now..' });
  //   } catch (error) {
  //     next(error);
  //   }
  // })


  /**
      * Register New User
      */

  .post(async (req, res, next) => {
    const { body } = req;
    const {
      email,
      mobile,
      name,
    } = body;

    try {
      const user = await findUser(req);

      // If User With Given Email ID Already Exists Send Error Response
      if (user) {
        const error = new UserAlreadyExistError();
        return next(error);
      }

      const password = await PasswordServ.hash(body.password);

      const newUser = new UnVerifiedAccount({
        email,
        name,
        mobile,
        password,
      });
      const result = await newUser.save();
      const userId = result.id;

      if (email) {
        OtpServ.sendEmailVerification(userId, email);
      }

      res.json({
        message: 'Verification Email Sent To Your Email Id.. Please Verify Your Email By Clicking The Verification Link',
      });
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
