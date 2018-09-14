'use strict';
const { SendMail } = require('../../lib');
const { URLSearchParams, URL } = require('url');
const config = require('config');
const HOST_ADDR = config.get('HOST_ADDR');
const passwordResetPath = config.get('PASSWORD_RESET_PATH');

function getTemplate(url) {
    const template = `
    <p> Click The Following Link To Reset Your Account Password.. 
      <a href="${url}">Click To Verify Your Account</a>

      <br/>
      or Just Copy Paste the below text...
      <b>${url}</b>
      <mark>This Link can be used only once and within one day..</mark>
    </p>
`;

    return template;
}



async function send(otpToken, email) {
    const otp = otpToken;
    const params = new URLSearchParams({
        otp
    });

    const host = HOST_ADDR.ui;
    const url = new URL(`${host}${passwordResetPath}`);
    url.search = params.toString();
    const html = getTemplate(url.href);
    return SendMail.send(email, {
        html,
        subject: 'Password Reset Link'
    });
}




module.exports = {
    send,
};