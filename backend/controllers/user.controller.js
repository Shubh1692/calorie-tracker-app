(function () {
	const
		{ validationErrorWithData } = require("../helpers/apiResponse"),
		{ validationResult } = require("express-validator"),
		{ createUserRequestSchema } = require("../helpers/requestSchemaValidator"),
		UserModel = require('../models/user');
	const createUser = [...createUserRequestSchema, async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return validationErrorWithData(req, res, "Validation Error.", errors.array());
			}
			next();
		} catch (error) {
			validationErrorWithData(req, res, "Data is missing", error);
		}
	}, async (req, res) => {
		const { name, weight, sex, height, dob } = req.body;
		try {
			const user = new UserModel({
				name, weight, sex, height, dob
			});
			await user.save();
			return res.status(200).json({
				status: 200,
				data: user,
				message: 'User created Successfully.',
				success: true
			});
		} catch (error) {
			validationErrorWithData(req, res, "Error while creating error from db", error);
		}
	}];


	const getUsers = [async (req, res) => {
	
		UserModel.find({}).exec((err, users) => {
			if (err) {
				return validationErrorWithData(req, res, "Error while fetching error from db", err);
			}
			return res.status(200).json({
				data: users,
				status: 200,
				success: true
			});
		});
	}];

	const deleteUser = [async (req, res) => {
		UserModel.remove({
			_id: req.params.id
		}).exec((err, deleteUser) => {
			if (err) {
				return validationErrorWithData(req, res, "Error while deleting error from db", err);
			}
			return res.status(200).json({
				data: deleteUser,
				message: 'User deleted successfully',
				status: 200,
				success: true
			});
		});
	}];

	module.exports = {
		createUser,
		getUsers,
		deleteUser
	};
}())