'use strict';

const User = require('../../models/user');
const UnverifiedUser = require('../../models/unverified-account');
const OTP = require('../../models/otp');
const { InvalidLinkError } = require('../../constants/errors');


const verifyEmail = async (req, res, next) => {
  try {
    const otpDoc = await OTP.findOne({ id: req.body.uid });
    if (otpDoc.otp !== req.body.otp) {
      const error = new InvalidLinkError();
      return next(error);
    }

    const unverifiedUser = await UnverifiedUser.findOne({ id: otpDoc.userId });

    if (unverifiedUser) {
      const user = new User(unverifiedUser.toObject());
      user.isEmailVerified = true;
      await Promise.all([user.save(), unverifiedUser.remove()]);
      return res.json({ message: 'Email Verified.. You Can Login Now' });
    }

    const user = User.findOne({ id: otpDoc.userId });

    if (user) {
      user.isEmailVerified = true;
      await user.save();
      return res.json({ message: 'Email Verified' });
    }

    const error = new InvalidLinkError();
    return next(error);
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
