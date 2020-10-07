'use strict';

const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const { roles, USER } = require('../constants/roles');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const UserSchema = new Schema({
  id: { type: String, default: uuid, unique: true },
  name: {
    type: String,
    required: getRequiredFiledMessage('Name'),
    trim: true,
  },
  email: {
    type: String,
    required: getRequiredFiledMessage('Email'),
    trim: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: getRequiredFiledMessage('Mobile'),
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    enum: roles,
    default: USER,
    trim: true,
  },
  password: {
    type: String,
    required: getRequiredFiledMessage('Password'),
  },
  isEmailVerified: { type: Boolean, default: false },
  isMobileVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  loginIp: { type: String, default: '' },
  lastLoginProvider: { type: String, default: '' },
  currentLoginProvider: { type: String, default: '' },
  lastLogin: { type: Date, default: Date.now },
  lastFailedLogin: Date,
  currentLogin: { type: Date, default: Date.now },
}, options);

module.exports = mongoose.model('User', UserSchema);
