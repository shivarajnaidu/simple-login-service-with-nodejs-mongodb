'use strict';
const { SendMail } = require('../../lib');
const { URLSearchParams, URL } = require('url');

function getTemplate(url) {
    const template = `
    <p> Click The Following Link To Verify Your Account.. 
      <a href="${url}">Click To Verify Your Account</a>
    </p>
`;

    return template;
}



async function send(otp, email) {
    const params = new URLSearchParams({
        otp,
        action: 'verify-email'
    });

    const url = new URL('http://localhost:3000/users/profile/');
    url.search = params.toString();
    const html = getTemplate(url.href);
    SendMail.send(email, {
        html,
        subject: 'Email Verification'
    })
}



module.exports = {
    send
};