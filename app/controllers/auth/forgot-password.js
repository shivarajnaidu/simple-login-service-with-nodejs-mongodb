'use strict';

const uuid = require('uuid/v4');

const { User, UserProfiles } = require('../../models');

const { LocalProfile } = UserProfiles;
const { TokenServ } = require('../../lib');
const {
  UserNotFoundError,
} = require('../../errors');

const {
  SendPasswordResetMail,
} = require('../../helpers/mail');


const forgotPassword = async (req, res, next) => {
  const {
    email,
  } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      const error = new UserNotFoundError();
      return next(error);
    }

    const otp = uuid();
    const otpToken = TokenServ.generate({ otp });

    const profile = await LocalProfile.findOne({ userId: user.id }).exec();
    await Object.assign(profile, { otp }).save();
    SendPasswordResetMail.send(await otpToken, email)
      // eslint-disable-next-line no-unused-vars
      .then((data) => { })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));

    res.json({
      message: 'Password Reset Email Sent To Your Email.. Please Use That Link To Reset Your Password',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = forgotPassword;