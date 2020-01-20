'use strict';

const User = require('../models/user');

const createUser = async (req, res, next) => {
  try {
    const doc = new User(req.body);
    const result = await doc.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
};


const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findOne({ id });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getUserList = async (req, res, next) => {
  try {
    const results = await User.find({});
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await User.findOneAndUpdate({ id }, req.body, { new: true });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndRemove({ id });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUser,
  getUserList,
  updateUser,
  deleteUser,
};
