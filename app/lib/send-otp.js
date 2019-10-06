const { send: sendMail } = require('./send-mail');


const sendOtpToEmail = (otp, email) => {
    const html = `
       <b>${otp}</b> is your OTP to verify your account.
    `;

    sendMail(email, { html });
}


const sendOtp = (otp, { email, mobile }) => {

    if (email) {
        sendOtpToEmail(otp, email);
    }

}

module.exports = { sendOtp };
