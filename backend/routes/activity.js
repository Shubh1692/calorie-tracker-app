const express = require("express");
const router = express.Router();
const ActivityController = require("../controllers/activity.controller");
/**
 * @swagger
 * tags:
 * - name: "activities"
 * components:
 *   schemas:
 *      ActivityRes:
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
 * /api/activity/{search}:
 *   get:
 *     tags:
 *       - "activities"
 *     summary: get activites
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
 *           $ref: '#/components/schemas/ActivityRes'
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
router.get("/:search", ActivityController.getActivitys);

/**
 * @swagger
 *
 * /api/activity/addActivities:
 *   get:
 *     tags:
 *       - "activities"
 *     summary: Add activiys in db
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Add activiy in db
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
router.get("/addActivities", ActivityController.addActivitiesInDb);
module.exports = router;