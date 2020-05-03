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

const UnVerifiedAccountSchema = new Schema({
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
}, options);

module.exports = mongoose.model('UnVerifiedAccount', UnVerifiedAccountSchema);
