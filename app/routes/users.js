'use strict';

const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');

router.route('/')
  .post(userController.createUser)
  .get(userController.getUserList);

router.route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = router;
