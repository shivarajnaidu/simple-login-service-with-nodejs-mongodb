'use strict';

const { sendMail } = require('./send-mail');
const { sendSMS } = require('./send-sms');

function makeLink(otp, otpId) {
  const host = 'http://localhost:4000';
  const passwordResetPath = '/reset';

  const params = new URLSearchParams({
    uid: otpId,
    otp,
  });
  const url = new URL(`${host}${passwordResetPath}`);
  url.search = params.toString();
  return url;
}

async function sendEmailVerificationLink(otp, otpId, to) {
  const url = makeLink(otp, otpId);
  const template = `
  <p> Click The Following Link To Verify Your Email ID.. 
    <a href="${url}">Click To Verify Your Account</a>
    <br/>
    <mark>This Link can be used only once and within one day..</mark>
  </p>
`;

  const subsject = 'Email Verification from Example.com';
  try {
    await sendMail(to, { subsject, html: template });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}


function mobileVerificationLink(otp, otpId, to) {
  const url = makeLink(otp, otpId);
  const template = `
  <p> Click The Following Link To Verify Your Mobile No.. 
    <a href="${url}">Click To Verify Your Account</a>
    <br/>
    <mark>This Link can be used only once and within one day..</mark>
  </p>
`;

  const subsject = 'Email Verification from Example.com';
  sendSMS(to, { subsject, html: template });
}


function sendPasswordResetLink(otp, otpId, to) {
  const url = makeLink(otp, otpId);
  const template = `
  <p> Click The Following Link To Reset Your Account Password.. 
  <a href="${url}">Click To Verify Your Account</a>
  <br/>
  <mark>This Link can be used only once and within one day..</mark>
</p>
`;

  const subsject = 'Email Verification from Example.com';
  sendMail(to, { subsject, html: template });
}


module.exports = {
  sendEmailVerificationLink,
  mobileVerificationLink,
  sendPasswordResetLink,
};
