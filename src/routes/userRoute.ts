import { Router } from "express";

import { userController } from "../controllers";

import * as routes from "../constants/urls";

const router = Router();

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
 *                   $ref: '#/components/schemas/UserLoggingIn'
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
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 */
router.post(routes.SIGN_IN, userController.signIn);

export default router;
