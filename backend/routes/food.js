const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/food.controller");
/**
 * @swagger
 * tags:
 * - name: "foods"
 * components:
 *   schemas:
 *      FoodRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            name:
 *              type: string
 *            foodGroup:
 *              type: string
 *            calories:
 *              type: number
 *            fat:
 *              type: string
 *            protien:
 *              type: string
 *            carbohydrate:
 *              type: string
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
 * /api/food/{search}:
 *   get:
 *     tags:
 *       - "foods"
 *     summary: get foods
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/FoodRes'
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
router.get("/:search", FoodController.getFoods);


/**
 * @swagger
 *
 * /api/food/addFoods:
 *   get:
 *     tags:
 *       - "foods"
 *     summary: Add foods in db
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Add food in db
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
router.get("/addFoods", FoodController.addFoodsInDB);
module.exports = router;