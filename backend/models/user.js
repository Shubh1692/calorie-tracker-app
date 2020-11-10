(function () {
	const {
		Schema,
		model
	} = require("mongoose");
	const UserSchema = new Schema({
		name: {
			type: String,
			required: [true, "Name is Require"]
		},
		weight: {
			type: Number,
			required: [true, "Weight is Require"]
		},
		height: {
			type: Number,
			required: [true, "Height is Require"]
		},
		sex: {
			type: String,
			required: [true, "Gender is Require"]
		},
		dob: {
			type: Date,
			required: [true, "Date of birth is Require"]
		},
	}, { timestamps: true, });
	UserSchema.index({ name: 1 });
	UserSchema.index({ updatedAt: 1 });
	module.exports = model("users", UserSchema);
})();