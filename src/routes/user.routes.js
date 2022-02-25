import express from "express";
import createUserValidator from "../middlewares/createUserValidator";
import loginValidator from "../middlewares/loginValidator";
import { createUser, login } from "../controllers/user.controller";

const router = express.Router();

/**
 * @swagger
 * /user/:
 *   post:
 *     tags:
 *       - user
 *     summary: Adds a new user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                required: true
 *                example: example@mail.com
 *              password:
 *                type: string
 *                required: true
 *                example: 123456789
 *              confirmPassword:
 *                type: string
 *                required: true
 *                example: 123456789
 *     responses:
 *       422:
 *         description: Returns success; false, status code 422, internal error code 422, "Invalid request data" message, and specifies where the error is, in this example email field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 422
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *                 error:
 *                   type: string
 *                   example: \"email\" is required
 *       400:
 *         description: Returns false success, status code 400, internal error code 55, and a "User already exists" message when the user email is taken.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 55
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       200:
 *         description: Returns a user object in the field of data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Contains service information.
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     email:
 *                       type: string
 *                       example: example@mail.com
 *                 message:
 *                   type: string
 *                   example: Request successful
 */
router.route("/").post(createUserValidator, createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - user
 *     summary: Returns JWT Authorization.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                required: true
 *                example: example@mail.com
 *              password:
 *                type: string
 *                required: true
 *                example: 123456789
 *     responses:
 *       422:
 *         description: Returns success; false, status code 422, internal error code 422, "Invalid request data" message, and specifies where the error is, in this example email field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 422
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *                 error:
 *                   type: string
 *                   example: \"email\" is required
 *       400:
 *         description: Returns false success, status code 400, internal error code 55, and an "Unauthorized access" message when the user email is taken.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 55
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       200:
 *         description: Returns a user object in the field of data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Contains service information.
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     email:
 *                       type: string
 *                       example: example@mail.com
 *                     jwt:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5NWZmZDg1M2JhMDAxNTA1YThhNyIsImlhdCI6MTYyNjIxMDk1MX0.NgvfvjBiDmuvrsOiJmH2L85nxb0OX381Qe0ic7eevek
 *                 message:
 *                   type: string
 *                   example: Request successful
 */
router.route("/login").post(loginValidator, login);

module.exports = router;
