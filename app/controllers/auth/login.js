'use strict';

const User = require('../../models/user');
const { generate: generateToken } = require('../../lib/token');
const { match: matchPassword } = require('../../lib/password');
const { InvalidCredidentialsError, EmailNotVerifiedError } = require('../../constants/errors');

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new InvalidCredidentialsError();
      return next(error);
    }

    if (!user.isEmailVerified) {
      const error = new EmailNotVerifiedError();
      return next(error);
    }

    const isPasswordMatched = await matchPassword(req.body.password, user.password);

    if (!isPasswordMatched) {
      const error = new InvalidCredidentialsError();
      return next(error);
    }

    const tokenPayload = {
      userId: user.id,
      role: user.role,
    };

    const token = await generateToken(tokenPayload);
    const resData = {
      token,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    res.json(resData);
  } catch (error) {
    next(error);
  }
};

module.exports = login;
