/* eslint-disable no-console */
const uuid = require('uuid/v4');
const { Otp } = require('../models');
const TokenServ = require('./token');
const { NewAccountVerification } = require('../helpers/mail');

function generateOTPForMobile() {
  // Declare a digits variable
  // which stores all digits
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i += 1) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function generateOTPForEmail() {
  return uuid();
}

async function sendEmailVerification(userId, email) {
  const otpDoc = new Otp({
    userId,
    otp: generateOTPForEmail(),
    type: 'account_verification',
  });

  try {
    const result = await otpDoc.save();
    const otp = await TokenServ.generate(result.otp);
    NewAccountVerification.send(otp, email);
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  generateOTPForEmail,
  generateOTPForMobile,
  sendEmailVerification,
};
