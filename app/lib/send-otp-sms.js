const { URL, URLSearchParams } = require('url');
const request = require('request');
const config = require('config');

const authkey = config.get('MSG91');

function sendOtp(otp, mobile) {
  const message = `Use ${otp} as OTP for verification. OTP valid for 15 mins. Don't share with anyone.`;
  const url = new URL('https://api.msg91.com/api/sendhttp.php');
  const params = new URLSearchParams({
    mobiles: mobile,
    sender: 'SIMPLE',
    route: 4,
    message,
    authkey,
    country: 91,
  });

  url.search = params.toString();

  return new Promise((resolve, reject) => {
    request.get(url.toString(), (error, response, body) => {
      if (error) {
        return reject(error);
      }

      resolve({ response, body });
    });
  });
}


// (async () => {
//     try {
//         const data = await sendOtp(12345678, '+918861518641');
//         console.log(data.body)
//     } catch (error) {
//         console.error(error);
//     }
// })();

module.exports = { sendOtp };
