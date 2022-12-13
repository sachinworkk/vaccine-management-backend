import { Router } from "express";

import { userController } from "../controllers";

import * as routes from "../constants/urls";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Admin
 *         gender:
 *           type: string
 *           description: The user's gender.
 *           example: male
 *         dateOfBirth:
 *           type: date
 *           description: The user's date of birth.
 *           example: 1997/02/10
 *         email:
 *           type: email
 *           description: The user's email.
 *           example: admin@test.com
 *         address:
 *           type: string
 *           description: The user's address.
 *           example: USA
 *
 *     LoginPayload:
 *       type: object
 *       properties:
 *         email:
 *           type: email
 *           description: The user's email.
 *           example: admin@test.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: password
 *
 *     UserLoggedIn:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/User'
 *
 *     UserSigningUp:
 *       allOf:
 *         - type: object
 *           properties:
 *             password:
 *               type: string
 *               description: The user's password.
 *               example: password
 *         - $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSigningUp'
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserLoggedIn'
 *                 message:
 *                   type: string
 *                   example: User created successfully
 */
router.post(routes.SIGN_UP, userController.signUp);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in the existing user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPayload'
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserLoggedIn'
 *                 accessToken:
 *                   type: string
 *                   example: zxcxcadESDFXCVXCVZzxczxcszxcsxzx
 *                 refreshToken:
 *                   type: string
 *                   example: axzcsadwsdfSDFSCVxcvxcvxcvesdfes
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 */
router.post(routes.SIGN_IN, userController.signIn);

export default router;
