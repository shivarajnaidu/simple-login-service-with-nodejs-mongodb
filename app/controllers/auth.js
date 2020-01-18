'use strict';

const { User, UnVerifiedAccount, OtpList } = require('../models');
const { PasswordServ, OtpServ, TokenServ } = require('../lib');
const {
  UserAlreadyExistError,
  EmailNotVerifiedError,
  IncorrectPasswordError,
} = require('../errors');


const signup = async (req, res, next) => {
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

    /*
    * remove the user from unverified accounts if he already tries to signup
    * but haven't succeded (so that we can create a new unverified
    *  doc and otp for new signup request with same email)
    */

    await UnVerifiedAccount.findOneAndDelete({ email });

    const password = await PasswordServ.hash(body.password);
    const newUser = new UnVerifiedAccount({
      email, password, name,
    });
    const result = await newUser.save();

    const otpDoc = new OtpList({ userId: result.id, type: 'new_account_verification' });
    const otpResult = await otpDoc.save();

    await OtpServ.sendOtp(otpResult.otp, { email });
    res.json({
      uid: otpResult.id,
      message: 'Otp Sent To Your Registered Email',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  // const loginIp = userIP(req);
  // const currentLogin = Date.now();
  // const currentLoginProvider = 'local';

  const {
    email,
    password,
  } = req.body;

  try {
    const user = await User.findOne({ email, isDeleted: false, isActive: true }).exec();

    //             if (!user) {
    //                 const error = new UserNotFoundError();
    //                 return next(error);
    //             }

    // eslint-disable-next-line no-shadow
    const profile = user.profiles.find((profile) => profile.provider === 'local');

    // If Email Is Not Verified
    if (profile && !profile.isEmailVerified) {
      Object.assign(user, { lastFailedLogin: Date.now() });
      await user.save();
      const error = new EmailNotVerifiedError();
      return next(error);
    }

    const isCorrectPassword = await PasswordServ.match(password, profile.password);

    if (!isCorrectPassword) {
      const error = new IncorrectPasswordError();
      return next(error);
    }

    const tokenData = {
      email,
      provider: profile.provider,
      userId: user.id,
      role: user.role,
      profileId: profile.id,
    };

    const token = await TokenServ.generate(tokenData);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
