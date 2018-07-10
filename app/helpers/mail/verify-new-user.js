'use strict';
const { SendMail } = require('../../lib');
const { URLSearchParams, URL } = require('url');

function getTemplate(url) {
    const template = `
    <p> Click The Following Link To Verify Your Account.. 
      <a href="${url}">Click To Verify Your Account</a>

      <br/>
      or Just Copy Paste the below text...
      <b>${url}</b>
    </p>
`;

    return template;
}



async function send(otpToken, email) {
    const otp = otpToken;
    const params = new URLSearchParams({
        otp,
        verify: 'account'
    });

    const url = new URL('http://localhost:3000/api/auth/signup');
    url.search = params.toString();
    const html = getTemplate(url.href);
    return SendMail.send(email, {
        html,
        subject: 'Email Verification'
    });
}



module.exports = {
    send
};