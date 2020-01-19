const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.route('/signup')
  .post(authController.signup);

router.route('/login')
  .post(authController.login);

module.exports = router;
