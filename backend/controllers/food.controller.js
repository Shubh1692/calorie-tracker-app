(function () {
    const
        { validationErrorWithData } = require("../helpers/apiResponse"),
        FoodModel = require('../models/food'),
        { Foods } = require('../config/foods'),
        { getSearchSchema } = require("../helpers/requestSchemaValidator");
    const getFoods = [...getSearchSchema, async (req, res) => {
        try {
            FoodModel.find({
                'name': { '$regex': req.params.search, '$options': 'i' }
            }).limit(10).exec((err, foods) => {
                if (err) {
                    return validationErrorWithData(req, res, "Error while fetching error from db", err);
                }
                return res.status(200).json({
                    status: 200,
                    success: true,
                    data: foods
                });
            })
        } catch (error) {
            validationErrorWithData(req, res, "Error while fetching error from db", error);
        }
    }];


    const addFoodsInDB = [async (req, res) => {
        try {
            FoodModel.insertMany(Foods.map((data) => ({
                "name": data.name,
                "foodGroup": data["Food Group"],
                "calories": data["Calories"],
                "fat": data["Fat (g)"],
                "protein": data["Protein (g)"],
                "carbohydrate": data["Carbohydrate (g)"],
                "serviceDesctiption": data["Serving Description 1 (g)"],
            })))
            return res.status(200).json({
                status: 200,
                success: true
            });
        } catch (error) {
            validationErrorWithData(req, res, "Error while fetching error from db", error);
        }
    }];

    module.exports = {
        getFoods,
        addFoodsInDB
    };
})();