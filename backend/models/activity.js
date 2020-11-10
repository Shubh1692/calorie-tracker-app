(function () {
	const {
		Schema,
		model
	} = require("mongoose");
	const ActivitySchema = new Schema({
		activity: {
			type: String
		},
		motion: {
			type: String
		},
		mets: {
			type: Number
		}
	}, { timestamps: true, });
	module.exports = model("activities", ActivitySchema);
})();