'use strict';

const User = require('../../models/user');
const { ADMIN } = require('../../constants/roles');
const { PermissionDeniedError } = require('../../constants/errors');

const createUser = async (req, res, next) => {
  try {
    const doc = new User(req.body);
    const result = await doc.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
};


const getUsers = async (req, res, next) => {
  try {
    const result = await User.find({}, { password: false }).lean();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  if ((req.tokenData.role !== ADMIN) && req.params.id !== req.tokenData.userId) {
    const error = new PermissionDeniedError();
    return next(error);
  }

  try {
    const result = await User.findOne({ id: req.params.id }, { password: false });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(result);
  } catch (error) {
    next(error);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const result = await User.findOneAndRemove({ id: req.params.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
