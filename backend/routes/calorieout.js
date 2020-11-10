const express = require("express");
const router = express.Router();
const CalorieOutController = require("../controllers/caloriesout.controller");
/**
 * @swagger
 * tags:
 * - name: "caloriesout"
 * components:
 *   schemas:
 *      CreateCalorieOutReq:
 *       type: object
 *       required:
 *         - date
 *         - activities
 *         - createdBy
 *       properties:
 *         date:
 *           type: string
 *         activities:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               activity:
 *                  type: string
 *               duration:
 *                  type: number
 *         createdBy:
 *           type: string
 *      CreateCalorieOutRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            date:
 *              type: string
 *            activities:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                   activity:
 *                      type: string
 *                   duration:
 *                      type: number
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
 * /api/calorieout:
 *   post:
 *     tags:
 *       - "caloriesout"
 *     summary: Create a calorie out
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/CreateCalorieOutReq'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/CreateCalorieOutRes'
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
router.post("/", CalorieOutController.createCalorieOutForADay);

module.exports = router;