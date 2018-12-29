'use strict';
const express = require('express');
const router = express.Router();
const { User, UserProfiles } = require('../../models');
const { LocalProfile, FBProfile, GoogleProfile } = UserProfiles;
const { PasswordServ, AuthServ } = require('../../lib');
const { ROLES, hasPermission } = AuthServ;

function getRequiredProfiles(userId, profiles = '') {
	if (!profiles) {
		return [];
	}

	const ProfileTypes = {
		local: LocalProfile,
		fb: FBProfile,
		google: GoogleProfile
	};
	const requiredProfiles = profiles.split(',')
		.map(profileKey => ProfileTypes[profileKey])
		.map(profileModel => profileModel.findOne({ userId }, { password: false }).exec());
	return requiredProfiles;

}



router.route('/')

	.get(async (req, res, next) => {
		const query = { isDeleted: false };
		Object.assign(query, req.query);
		try {
			const user = await User.find(query).exec();
			res.json(user);
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
			role
		} = body;

		try {
			const user = await User.findOne({ email }).exec();

			if (user) {
				const error = new Error('User With Same Email Id Already Exist !');
				error.status = 409;
				throw error;
			}

			const newUser = new User({
				email,
				role
			});

			const result = await newUser.save();
			const userId = result.id;
			const password = await PasswordServ.hash(body.password);
			const profileData = {
				userId,
				name,
				password,
			};

			const profile = new LocalProfile(profileData);
			await profile.save();
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
		const { profiles } = req.query;
		try {
			const user$ = User.findOne({ id }).lean().exec();
			const requiredProfiles = getRequiredProfiles(id, profiles);
			const [user, ...profilesList] = await Promise.all([user$, ...requiredProfiles]);
			const resData = Object.assign({}, user, { profiles: profilesList });
			res.json(resData);
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
			return next(error)
		}

		try {
			const result = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true }).exec();
			res.json(result);
		} catch (error) {
			next(error);
		}
	})



module.exports = router;