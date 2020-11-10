const express = require("express");
const path = require("path");
const router = express.Router();
const calorieInController = require("./caloriein"),
	calorieOutController = require("./calorieout"),
	netCalorieController = require("./netcalorie"),
	userController = require("./user"),
	foodController = require("./food"),
	activityController = require("./activity");
/* GET home page. */
router.get("/", (req, res) => {
	res.render("index", { title: "Express" });
});
router.use("/user", userController);
router.use("/caloriein", calorieInController);
router.use("/calorieout", calorieOutController);
router.use("/calorie", netCalorieController);
router.use("/food", foodController);
router.use("/activity", activityController);

router.get("/error.log", (req, res) => {
	res.sendFile(path.join(__dirname, "../error.log"));
});

module.exports = router;