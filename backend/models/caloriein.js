(function () {
	const {
		Schema,
		model
	} = require("mongoose");
	const CalorieInSchema = new Schema({
		food: {
			type: Schema.Types.ObjectId,
			ref: "foods",
			required: [true, "Food is Require"]
		},
		date: {
			type: Date,
			required: [true, "Date is Require"]
		},
		time:{
			type: String,
			required: [true, "Time of food is Require"]
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: [true, "Created by user id is Require"]
		}
	}, { timestamps: true, });
	CalorieInSchema.index({ date: 1 });
	CalorieInSchema.index({ updatedAt: 1 });
	module.exports = model("caloriesin", CalorieInSchema);
}) ();