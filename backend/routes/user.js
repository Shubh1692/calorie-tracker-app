const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
/**
 * @swagger
 * tags:
 * - name: "users"
 * components:
 *   schemas:
 *      CreateUserReq:
 *       type: object
 *       required:
 *         - name
 *         - weight
 *         - height
 *         - dob
 *         - sex
 *       properties:
 *         name:
 *           type: string
 *         weight:
 *           type: number
 *         height:
 *           type: number
 *         sex:
 *           type: string
 *         dob:
 *           type: string
 *      UserRes:
 *        type: object
 *        properties:
 *            _id:
 *              type: string
 *            name:
 *              type: string
 *            weight:
 *              type: number
 *            height:
 *              type: number
 *            sex:
 *              type: string
 *            dob:
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
 * /api/user/:
 *   post:
 *     tags:
 *       - "users"
 *     summary: Create a user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           type: object
 *           schema:
 *             $ref: '#/components/schemas/CreateUserReq'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/components/schemas/UserRes'
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
router.post("/", UserController.createUser);

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - "users"
 *     summary: Returns all users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Get all users list
 *         schema:
 *           $ref: '#/components/schemas/UserRes'
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
router.get("/", UserController.getUsers);

/**
 * @swagger
 * /api/user/:id:
 *   delete:
 *     tags:
 *       - "users"
 *     summary: Delete user
 *     produces:
 *      - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB object userId for delete
 *     responses:
 *       200:
 *         description: Delete user by id
 *         schema:
 *           $ref: '#/components/schemas/UserRes'
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
router.delete("/:id", UserController.deleteUser);

module.exports = router;