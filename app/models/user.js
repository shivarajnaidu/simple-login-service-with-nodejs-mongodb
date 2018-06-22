'use strict';
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = {
  timestamps: true
};

const getRequiredFiledMessage = (filed) => {
    const message = `${filed} Should Not Be Empty`;
    return [true, message];
};

const UserSchema = new Schema({
  id: { type: String, default: uuid },
  name: { type: String, required: getRequiredFiledMessage('Name'), trim: true },
  email: { type: String, required: getRequiredFiledMessage('Email'), trim: true },
  role: { type: String, default: 'user', trim: true },
  password: { type: String, required: getRequiredFiledMessage('Password'), trim: true },
  isActive: { type: Boolean, default: true },
  // isApproved: { type: Boolean, default: false }
}, options);


const User = mongoose.model('User', UserSchema);
module.exports = User;