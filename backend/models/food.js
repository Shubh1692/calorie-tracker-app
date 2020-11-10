(function () {
	const {
		Schema,
		model
	} = require("mongoose");
	const FoodSchema = new Schema({
		name: {
			type: String
		},
		foodGroup: {
			type: String
		},
		calories: {
			type: Number
		},
		fat: {
			type: Number
		},
		protein: {
			type: Number
        },
        carbohydrate: {
			type: Number
        },
        serviceDescription: {
			type: String
		},
	}, { timestamps: true, });
	module.exports = model("foods", FoodSchema);
})();