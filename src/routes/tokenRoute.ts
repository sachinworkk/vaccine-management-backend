import { Router } from "express";

import { tokenController } from "../controllers";

import * as routes from "../constants/urls";

const router = Router();

/**
 * @swagger
 * /token/refresh:
 *   post:
 *     summary: Refresh access token.
 *     tags:
 *       - Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              refreshToken:
 *                  type: string
 *                  description: The user's refresh token.
 *                  example: zxczxczxSDSDsdxczczxdasdDSAFDSA
 *     responses:
 *       200:
 *         description: New Access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: asdaxczxfadsASDASDASDZXCZXCzxc
 */
router.post(routes.REFRESH_TOKEN, tokenController.refreshToken);

export default router;
