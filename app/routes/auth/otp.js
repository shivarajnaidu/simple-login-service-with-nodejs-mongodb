'use strict';

const express = require('express');
const { User, UnVerifiedAccount, OtpList } = require('../../models');
const { TokenServ, OtpServ } = require('../../lib');

const router = express.Router();


const handleNewAccountVarification = async (otpDoc, res, next) => {
  try {
    const unVerifiedUser = await UnVerifiedAccount.findOne({ id: otpDoc.userId }).lean();
    const {
      email, name, password,
    } = unVerifiedUser;
    const localProfile = {
      name,
      password,
      provider: 'local',
      isEmailVerified: true,
    };

    const user = new User({ email, profiles: [localProfile] });
    await Promise.all([
      user.save(),
      UnVerifiedAccount.deleteOne({ id: unVerifiedUser.id }),
      OtpList.deleteOne({ id: otpDoc.id }),
    ]);

    res.json('Your Account Verification Successfull');
  } catch (error) {
    next(error);
  }
};

const handlePasswordReset = async (otpDoc, res, next) => {
  try {
    const user = await User.findOne({ id: otpDoc.userId }).lean();
    const profile = user.profiles.find((p) => p.provider === 'local');

    const tokenData = {
      email: user.email,
      provider: profile.provider,
      userId: user.id,
      role: user.role,
      profileId: profile.id,
    };

    const [token] = await Promise.all([
      TokenServ.generate(tokenData),
      OtpList.deleteOne({ id: otpDoc.id }),
    ]);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};


router.route('/:id/resend')
  .post(async (req, res, next) => {
    const { id } = req;
    const {
      email,
    } = req.body;

    try {
      const otpResult = await OtpList.findOne({ id });
      if (!otpResult) {
        const error = new Error('Invalid OTP');
        return next(error);
      }

      await OtpServ.sendOtp(otpResult.otp, { email });
      res.json({
        uid: otpResult.id,
        message: 'Otp Sent To Your Registered Email',
      });
    } catch (error) {
      next(error);
    }
  });

/**
 * Verify Otps
 */

router.route('/:id')
  .post(async (req, res, next) => {
    const { id } = req.params;

    const { otp } = req.body;
    if (!otp) {
      const error = new Error('Otp Should Not Be Empty');
      return next(error);
    }

    try {
      const doc = await OtpList.findOne({ id });
      if (!doc) {
        const error = new Error('Invalid OTP');
        return next(error);
      }

      if (doc.otp !== otp) {
        const error = new Error('Incorrect OTP');
        return next(error);
      }

      if (doc.type === 'new_account_verification') {
        handleNewAccountVarification(doc, res, next);
      }

      if (doc.type === 'reset_password') {
        handlePasswordReset(doc, res, next);
      }
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
