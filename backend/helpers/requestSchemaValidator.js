(function () {
	const { body, param } = require("express-validator");

	const createUserRequestSchema = [body("name").isLength({ min: 3 }).trim(),
	body("height").isNumeric(),
	body("weight").isNumeric(),
	body("sex").isString({ min: 1 }),
	body("dob").isString({ min: 6 })];

	const createCalorieInForADaySchema = [
	body("date").isString({ min: 6}).isLength({ min: 6 }),
	body("food").isMongoId(),
	body("time").isString(),
	body("createdBy").isMongoId()];

	const createCalorieOutForADaySchema = [
		body("date").isString({ min: 6}).isLength({ min: 6 }),
		body("createdBy").isMongoId(),
		body("activities").isArray(),
		body("activities.*.activity").isMongoId(),
		body("activities.*.duration").isNumeric()];

	const netCalorieSchema = [
		param("date").isString({ min: 6}),
		param("userId").isMongoId(),
	];
	const getSearchSchema = [
		param("search").isString({ min: 1})
	];
	module.exports = {
		createUserRequestSchema,
		createCalorieInForADaySchema,
		createCalorieOutForADaySchema,
		netCalorieSchema,
		getSearchSchema
	};
}());