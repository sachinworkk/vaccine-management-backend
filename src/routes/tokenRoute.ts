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
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: New Access token generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessToken'
 */
router.post(routes.REFRESH_TOKEN, tokenController.refreshToken);

export default router;
