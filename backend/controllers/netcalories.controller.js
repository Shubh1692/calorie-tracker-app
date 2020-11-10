const moment = require("moment");

(function () {
    const
        { validationErrorWithData } = require("../helpers/apiResponse"),
        { validationResult } = require("express-validator"),
        { netCalorieSchema } = require("../helpers/requestSchemaValidator"),
        CalorieInModel = require('../models/caloriein'),
        CalorieOutModel = require('../models/calorieout'),
        { Types } = require('mongoose'),
        UserModel = require('../models/user');

    const getNetCalorie = [...netCalorieSchema, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return validationErrorWithData(req, res, "Validation Error.", errors.array());
            }
            const { userId, date } = req.params;
            const netCaloriesData = await UserModel.aggregate([
                {
                    $match: { "_id": Types.ObjectId(userId) },
                },
                {
                    $addFields: {
                        bmr: {
                            $cond: {
                                if: {
                                    $eq: ["$sex", "male"]
                                },
                                then: {
                                    $subtract: [{
                                        $sum: [66.4730, {
                                            $multiply: [13.7516, "$weight"]
                                        },
                                            {
                                                $multiply: [5.0033, "$height"]
                                            }]
                                    }, {
                                        $multiply: [6.7550, {
                                            $subtract: [
                                                { $subtract: [{ $year: new Date() }, { $year: "$dob" }] },
                                                {
                                                    $cond: [
                                                        {
                                                            $gt: [0, {
                                                                $subtract: [{ $dayOfYear: new Date() },
                                                                { $dayOfYear: "$dob" }]
                                                            }]
                                                        },
                                                        1,
                                                        0
                                                    ]
                                                }
                                            ]
                                        }]
                                    }]
                                },
                                else: {
                                    $subtract: [{
                                        $sum: [655.0955, {
                                            $multiply: [9.5634, "$weight"]
                                        },
                                            {
                                                $multiply: [1.8496, "$height"]
                                            }]
                                    }, {
                                        $multiply: [4.6756, {
                                            $subtract: [
                                                { $subtract: [{ $year: new Date() }, { $year: "$dob" }] },
                                                {
                                                    $cond: [
                                                        {
                                                            $gt: [0, {
                                                                $subtract: [{ $dayOfYear: new Date() },
                                                                { $dayOfYear: "$dob" }]
                                                            }]
                                                        },
                                                        1,
                                                        0
                                                    ]
                                                }
                                            ]
                                        }]
                                    }]
                                }
                            }
                        },
                    }
                },
                {
                    $lookup: {
                        from: "caloriesins",
                        let: {
                            createdBy: '$_id'
                        },
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    $and: [
                                        { '$eq': ['$createdBy', '$$createdBy'] },
                                    ]
                                },
                                date: {
                                    $gte: new Date(moment(date).startOf('day')),
                                    $lte: new Date(moment(date).endOf('day')),
                                },
                            }
                        }, {
                            $lookup: {
                                from: "foods",
                                localField: "food",
                                foreignField: "_id",
                                as: "food"
                            }
                        },
                        { $unwind: { path: "$food", preserveNullAndEmptyArrays: true } },
                        {
                            $group: {
                                "_id": "$_id",
                                createdAt: {
                                    $first: "$createdAt"
                                },
                                time: {
                                    $first: "$time"
                                },
                                createdBy: {
                                    $first: "$createdBy"
                                },
                                date: {
                                    $first: "$date"
                                },
                                "food": { $first: "$food" },
                                "foodId": { $first: "$food._id" }
                            },
                        }],
                        as: "caloriesins"
                    },
                },
                {
                    $addFields: {
                        "foodCaloriesPerDay": {
                            $reduce: {
                                input: "$caloriesins",
                                initialValue: 0,
                                in: { $sum: ["$$value", "$$this.food.calories"] }
                            }
                        }
                    },
                },
                {
                    $lookup: {
                        from: "caloriesouts",
                        let: {
                            createdBy: '$_id',
                            weight: "$weight"
                        },
                        'pipeline': [{
                            '$match': {
                                '$expr': {
                                    $and: [
                                        { '$eq': ['$createdBy', '$$createdBy'] },
                                    ]
                                },
                                date: {
                                    $gte: new Date(moment(date).startOf('day')),
                                    $lte: new Date(moment(date).endOf('day')),
                                },
                            }
                        },
                        {
                            $lookup: {
                                from: "activities",
                                "let": { "activities": "$activities" },
                                "pipeline": [
                                    {
                                        "$match": {
                                            "$expr": {
                                                "$in": ["$_id", "$$activities.activity"]
                                            }
                                        }
                                    },
                                    {
                                        "$replaceRoot": {
                                            "newRoot": {
                                                "activity": "$$ROOT",
                                                "duration": {
                                                    "$arrayElemAt": [
                                                        "$$activities.duration",
                                                        { "$indexOfArray": ["$$activities.activity", "$_id"] }
                                                    ]
                                                },
                                            }
                                        }
                                    }
                                ],
                                as: "activities"
                            }
                        },
                        {
                            $addFields: {
                                "activitiesCaloriesPerDayForACalorieOut": {
                                    $reduce: {
                                        input: {
                                            "$map": {
                                                "input": "$activities",
                                                "in": {
                                                    $multiply: ["$$this.activity.mets", "$$weight", {
                                                        $divide: ["$$this.duration", 60]
                                                    }]
                                                }
                                            }
                                        },
                                        initialValue: 0,
                                        in: { $sum: ["$$value", "$$this"] }
                                    }
                                }
                            },
                        }
                        ],
                        as: "caloriesouts"
                    },
                },
                {
                    $addFields: {
                        "activitiesCaloriesPerDay": {
                            $reduce: {
                                input: {
                                    "$map": {
                                        "input": "$caloriesouts",
                                        "in": "$$this.activitiesCaloriesPerDayForACalorieOut"
                                    }
                                },
                                initialValue: 0,
                                in: { $sum: ["$$value", "$$this"] }
                            }
                        }
                    },
                },
                {
                    $addFields: {
                        "netCalorie": {
                            $subtract: ["$foodCaloriesPerDay", {
                                $sum:  ["$bmr", "$activitiesCaloriesPerDay"]
                            }]
                        }
                    },
                },
            ])
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Net calories for a user',
                data: netCaloriesData
            });
        } catch (error) {
            validationErrorWithData(req, res, "Data is missing", error);
        }
    }];

    module.exports = {
        getNetCalorie
    };
})();