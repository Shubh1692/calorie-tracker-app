(function () {
    const
        { validationErrorWithData } = require("../helpers/apiResponse"),
        ActivityModel = require('../models/activity'),
        { Activities } = require('../config/activities'),
        { getSearchSchema } = require("../helpers/requestSchemaValidator");
    const getActivitys = [...getSearchSchema, async (req, res) => {
        try {
            ActivityModel.find({
                'motion': { '$regex': req.params.search, '$options': 'i' }
            }).limit(10).exec((err, activities) => {
                
                if (err) {
                    return validationErrorWithData(req, res, "Error while fetching error from db", err);
                }
                return res.status(200).json({
                    status: 200,
                    success: true,
                    data: activities
                });
            })
        } catch (error) {
            validationErrorWithData(req, res, "Error while fetching error from db", error);
        }
    }];

    const addActivitiesInDb = [async (req, res) => {
        try {
            ActivityModel.insertMany(Activities.map((data) => ({
                "name": data.ACTIVITY,
                "motion": data["SPECIFIC MOTION"],
                "mets": data["METs"]
            })));
            return res.status(200).json({
                status: 200,
                success: true
            });
        } catch (error) {
            validationErrorWithData(req, res, "Error while fetching error from db", error);
        }
    }];

    module.exports = {
        getActivitys,
        addActivitiesInDb
    };
})();