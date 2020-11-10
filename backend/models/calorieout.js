(function () {
	const {
		Schema,
		model
	} = require("mongoose");
	const CalorieOutSchema = new Schema({
		date: {
			type: Date,
			required: [true, "Date is Require"]
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: [true, "Created by user id is Require"]
		},
		activities: [{
            activity: {
                type: Schema.Types.ObjectId,
                ref: "activities",
                required: [true, "Activity is Require"]
            },
            duration: {
                type: Number,
                required: [true, "Activity duration is Require"]
            }
        }],
	}, { timestamps: true, });
	CalorieOutSchema.index({ date: 1 });
	CalorieOutSchema.index({ updatedAt: 1 });
	module.exports = model("caloriesout", CalorieOutSchema);
}) ();