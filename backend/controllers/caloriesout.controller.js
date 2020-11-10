(function () {
    const
        { validationErrorWithData } = require("../helpers/apiResponse"),
        { validationResult } = require("express-validator"),
        { createCalorieOutForADaySchema } = require("../helpers/requestSchemaValidator"),
        CalorieOutModel = require('../models/calorieout');

    const createCalorieOutForADay = [...createCalorieOutForADaySchema, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return validationErrorWithData(req, res, "Validation Error.", errors.array());
            }
            const { date, activities, createdBy } = req.body;
            const calorie = new CalorieOutModel({
                date, activities, createdBy
            });
            await calorie.save();
            return res.status(200).json({
                status: 200,
                success: true,
                data: calorie,
                message: 'Calorie out added successfully'
            });
        } catch (error) {
            validationErrorWithData(req, res, "Data is missing", error);
        }
    }];

    module.exports = {
        createCalorieOutForADay
    };
})();