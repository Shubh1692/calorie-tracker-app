const express = require("express");
const router = express.Router();
const NetCaloriesController = require("../controllers/netcalories.controller");
/**
 * @swagger
 * tags:
 * - name: "netcalories"
 * components:
 *   schemas:
 *      NetCaloriesRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            activity:
 *              type: string
 *            motion:
 *              type: string
 *            mets:
 *              type: number
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string 
 *            __v:
 *              type: string
 */


/**
 * @swagger
 *
 * /api/calorie/{userId}/{date}:
 *   get:
 *     tags:
 *       - "netcalories"
 *     summary: get net calories for a date based on user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB object userId
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *         required: true
 *         description: Date of user to find net calorie
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/NetCaloriesRes'
 *       400:
 *         description: Bad Request error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 *       404:
 *         description: Not found error
 *         schema:
 *           $ref: '#/components/schemas/BadRequest'
 */
router.get("/:userId/:date", NetCaloriesController.getNetCalorie);

module.exports = router;