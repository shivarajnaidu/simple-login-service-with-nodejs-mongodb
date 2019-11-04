'use strict';
const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const { PasswordServ, AuthServ } = require('../../lib');
const { ROLES, hasPermission } = AuthServ;

const removePassword = { 'profiles.password': 0 };
const projection = Object.assign({}, removePassword)
router.route('/')

	.get(async (req, res, next) => {
		const query = { isDeleted: false };
		Object.assign(query, req.query);
		try {
			const users = await User.find(query, projection);
			res.json(users);
		} catch (error) {
			next(error);
		}
	})


	// Create New User

	.post(AuthServ.authorize(ROLES.super_admin), async (req, res, next) => {
		const { body } = req;
		const {
			email,
			name,
			role = 'user',
		} = body;

		try {
			const user = await User.findOne({ email }).exec();

			if (user) {
				const error = new Error('User With Same Email Id Already Exist !');
				error.status = 409;
				throw error;
			}
			const password = await PasswordServ.hash(body.password);

			const newUser = new User({
				email,
				role,
				profiles: [
					{
						name,
						provider: 'local',
						password,
						isEmailVerified: true,
					}
				]
			});

			const result = await newUser.save();
			const profiles = [];
			for (const { password, ...profile } of result.profiles) {
				profiles.push(profile);
			}
			result.profiles = profiles;
			res.json(result);
		} catch (error) {
			next(error);
		}

	})



/*
 * Get Singale User Based on ID
 */

router.route('/:id')
	.get(async (req, res, next) => {
		const { id } = req.params;

		try {
			const user = await User.findOne({ id }, projection);
			res.json(user);
		} catch (error) {
			next(error);
		}
	})


    /*
     * User Profile Update Admin
     */


	.put(AuthServ.authorize(ROLES.super_admin), async (req, res, next) => {
		const { id } = req.params;
		const { body } = req;

		const adminOnlyFields = ['role', 'isDeleted'].filter(field => body[field] !== undefined);
		if (!hasPermission(req.tokenData.role, ROLES.super_admin) && adminOnlyFields.length > 0) {
			const error = new Error(`You Don't Have Permission To Edit This.`);
			error.status = 401;
			return next(error);
		}

		try {
			const result = await User.findOneAndUpdate({ id }, body, { new: true }).exec();
			res.json(result);
		} catch (error) {
			next(error);
		}
	})


    /*
     * User Account Deleted
     */

  .delete(AuthServ.authorize(ROLES.super_admin), async (req, res, next) => {
    const { id } = req.params;
    const { role, userId } = req.tokenData;

    if (id !== userId && !hasPermission(req.tokenData.role, ROLES.super_admin)) {
      const error = new Error('Unauthorized Access');
      error.status = 401;
      return next(error);
    }

    try {
      const result = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true }).exec();
      res.json(result);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
