const express = require('express');

const router = express.Router();
const authController = require('../../controllers/auth');

router.route('/')

  /**
      * Register New User
      */

  .post(authController.signup);

module.exports = router;
