const uuid = require('uuid');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const options = {
  timestamps: true,
};

const generateOTP = () => {
  // Declare a digits variable
  // which stores all digits
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i += 1) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const getRequiredFiledMessage = (filed) => {
  const message = `${filed} Should Not Be Empty`;
  return [true, message];
};

const OtpListSchema = new Schema({
  id: { type: String, default: uuid },
  userId: { type: String, required: getRequiredFiledMessage('User ID') },
  otp: { type: String, default: generateOTP },
  type: { type: String, required: getRequiredFiledMessage('OTP type') },
}, options);

OtpListSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });
const OtpList = mongoose.model('OtpList', OtpListSchema);
module.exports = OtpList;
