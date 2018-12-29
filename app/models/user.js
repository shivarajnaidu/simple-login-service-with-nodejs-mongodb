'use strict';
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = {
  timestamps: true
};

const getRequiredFiledMessage = filed => {
    const message = `${filed} Should Not Be Empty`;
    return [true, message];
};

const UserSchema = new Schema({
  id: { type: String, default: uuid },
  email: { type: String, required: getRequiredFiledMessage('Email'), trim: true, unique: true },
  role: { type: String, default: 'user', trim: true },
  isActive: { type: Boolean, default: true },
  isDeleted: {type: Boolean, default: false },
  loginIp: { type: String, default: ''},
  lastLoginProvider: { type: String, default: ''},
  currentLoginProvider: { type: String, default: ''},
  lastLogin: { type: Date, default: Date.now },
  lastFailedLogin: Date,
  currentLogin: { type: Date, default: Date.now }
}, options);

const User = mongoose.model('User', UserSchema);
module.exports = User;