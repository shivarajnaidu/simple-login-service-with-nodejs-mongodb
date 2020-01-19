'use strict';

const { User } = require('../../models');
const { PasswordServ, TokenServ } = require('../../lib');

const {
  EmailNotVerifiedError,
  IncorrectPasswordError,
} = require('../../errors');


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

module.exports = login;
