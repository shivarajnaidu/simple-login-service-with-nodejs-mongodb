'use strict';

const User = require('../../models/user');
const OTP = require('../../models/otp');
const { InvalidLinkError } = require('../../constants/errors');

const verifyMobile = async (req, res, next) => {
  try {
    const otpDoc = await OTP.findOne({ id: req.body.uid });
    if (otpDoc.otp !== req.body.otp) {
      const error = new InvalidLinkError();
      return next(error);
    }

    const user = User.findOne({ id: otpDoc.userId });
    if (!user) {
      const error = new InvalidLinkError();
      return next(error);
    }

    user.isMobileVerified = true;
    await user.save();
    return res.json({ message: 'Mobile Verified' });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyMobile;
