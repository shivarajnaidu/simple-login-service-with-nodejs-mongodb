'use strict';

const express = require('express');

const userCtrl = require('../controllers/users');
const { authorize } = require('../lib/auth');
const { ADMIN } = require('../constants/roles');

const router = express.Router();

router.route('/')

  // Get List Of Users
  .get(authorize([ADMIN]), userCtrl.getUsers)

  // Create New User
  .post(authorize([ADMIN]), userCtrl.createUser);


router.route('/:id')

  // Get User
  .get(authorize(), userCtrl.getUserById)

  // Update User
  .put(authorize(), userCtrl.updateUser)

  // Delete User
  .delete(authorize(ADMIN), userCtrl.deleteUser);


module.exports = router;
