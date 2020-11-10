(function () {
    const
        { validationErrorWithData } = require("../helpers/apiResponse"),
        { validationResult } = require("express-validator"),
        { createCalorieInForADaySchema } = require("../helpers/requestSchemaValidator"),
        CalorieInModel = require('../models/caloriein');

    const createCalorieInForADay = [...createCalorieInForADaySchema, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return validationErrorWithData(req, res, "Validation Error.", errors.array());
            }
            const { date, food, time, createdBy } = req.body;
            const calorie = new CalorieInModel({
                date, food, time, createdBy
            });
            await calorie.save();
            return res.status(200).json({
                status: 200,
                success: true,
                data: calorie,
                message: 'Calorie in added successfully'
            });
        } catch (error) {
            validationErrorWithData(req, res, "Data is missing", error);
        }
    }];

    module.exports = {
        createCalorieInForADay
    };
})();