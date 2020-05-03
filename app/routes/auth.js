'use strict';

const express = require('express');
const authCtrl = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.post('/verification/email', authCtrl.verifyEmail);
router.post('/verification/mobile', authCtrl.verifyMobile);

module.exports = router;
