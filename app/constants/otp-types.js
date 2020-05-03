'use strict';

const VERIFY_EMAIL = 'verify_email';
const VERIFY_MOBILE = 'verify_mobile';
const RESET_PASSWORD = 'reset_password';


const otpTypes = [
  VERIFY_EMAIL,
  VERIFY_MOBILE,
  RESET_PASSWORD,
];

module.exports = {
  VERIFY_EMAIL,
  VERIFY_MOBILE,
  RESET_PASSWORD,
  otpTypes,
};
