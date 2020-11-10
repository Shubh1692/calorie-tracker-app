const express = require("express");
const router = express.Router();
const CalorieController = require("../controllers/caloriesin.controller");
/**
 * @swagger
 * tags:
 * - name: "caloriesin"
 * components:
 *   schemas:
 *      CreateCalorieInReq:
 *       type: object
 *       required:
 *         - food
 *         - date
 *         - time
 *         - createdBy
 *       properties:
 *         food:
 *           type: string
 *         date:
 *           type: string
 *         time:
 *           type: string
 *         createdBy:
 *           type: string
 *      CreateCalorieInRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            food:
 *              type: string
 *            date:
 *              type: string
 *            time:
 *              type: number
 *            createdBy:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string 
 *            __v:
 *              type: string
 *      BadRequest:
 *       type: object
 *       properties:
 *           status:
 *             type: string
 *           message:
 *            type: string
 *       required:
 *         - status
 *         - message
 */

/**
 * @swagger
 *
 * /api/caloriein:
 *   post:
 *     tags:
 *       - "caloriesin"
 *     summary: Create a calorie in
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/CreateCalorieInReq'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/CreateCalorieInRes'
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
router.post("/", CalorieController.createCalorieInForADay);

module.exports = router;