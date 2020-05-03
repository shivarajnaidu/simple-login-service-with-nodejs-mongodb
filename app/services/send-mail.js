'use strict';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// const mailOptions = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

async function sendMail(to, mailOptions) {
  const defaultOptions = {
    from: 'admin@example.com',
    subject: 'Message From example.com',
  };

  if (!to) {
    throw new Error('To Address Should Not Be Empty');
  }

  const message = {
    ...defaultOptions,
    ...mailOptions,
    to,
  };

  return sgMail.send(message);
}


module.exports = {
  sendMail,
};
