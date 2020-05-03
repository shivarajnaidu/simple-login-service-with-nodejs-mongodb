'use strict';

const express = require('express');

const userCtrl = require('../controllers/users');

const router = express.Router();

router.route('/')

  // Get List Of Users
  .get(userCtrl.getUsers)

  // Create New User
  .post(userCtrl.createUser);


router.route('/:id')

  // Get User
  .get(userCtrl.getUserById)

  // Update User
  .put(userCtrl.updateUser)

  // Delete User
  .delete(userCtrl.deleteUser);


module.exports = router;
