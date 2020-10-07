'use strict';

const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');
const shortId = require('shortid');
const { otpTypes } = require('../constants/otp-types');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const OtpListSchema = new Schema({
  id: { type: String, default: uuid, unique: true },
  userId: { type: String, required: getRequiredFiledMessage('User ID') },
  otp: { type: String, default: shortId.generate, required: getRequiredFiledMessage('OTP') },
  type: { type: String, enum: otpTypes, required: getRequiredFiledMessage('OTP type') },
}, options);

OtpListSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });

module.exports = mongoose.model('Otp', OtpListSchema);
