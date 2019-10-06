'use strict';
module.exports = function(app) {
  var OTP = require('../controllers/OTPController');

  // todoList Routes
  app.route('/register')
    .get(OTP.list_email)
    .post(OTP.send_email);


  app.route('/verify')
    .get(OTP.check_status)
    .post(OTP.otp_verify);
};
