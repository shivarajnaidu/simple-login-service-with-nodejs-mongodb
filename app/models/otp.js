/* eslint-disable no-plusplus */


const uuid = require('uuid');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};


const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const OtpListSchema = new Schema({
  id: { type: String, default: uuid },
  userId: { type: String, required: getRequiredFiledMessage('User ID') },
  otp: { type: String, required: getRequiredFiledMessage('OTP') },
  type: { type: String, required: getRequiredFiledMessage('OTP type') },
}, options);

OtpListSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });
const Otp = mongoose.model('Otp', OtpListSchema);
module.exports = Otp;
