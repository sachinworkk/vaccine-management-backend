import multer from "multer";

import { Router, Request, Response, NextFunction } from "express";

import { RequestWithUser } from "../types/requestWIthUser";

import { vaccineController } from "../controllers";

import * as routes from "../constants/urls";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /vaccine:
 *   get:
 *     summary: Get the vaccines.
 *     tags:
 *       - Vaccine
 *     responses:
 *       200:
 *         description: Get all the vaccines
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  vaccines:
 *                    type: array
 *                    items:
 *                     $ref: '#/components/schemas/VaccineResponse'
 */
router.get(routes.ROOT, vaccineController.getVaccines);

/**
 * @swagger
 * /vaccine/{id}:
 *   get:
 *     summary: Get the vaccine by id.
 *     parameters:
 *       - in: path
 *         name: id
 *     tags:
 *       - Vaccine
 *     responses:
 *       200:
 *         description: Vaccine get by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vaccine:
 *                   $ref: '#/components/schemas/VaccineResponse'
 */
router.get(routes.VACCINE_ID, vaccineController.getVaccineById);

/**
 * @swagger
 * /vaccine:
 *   post:
 *     summary: Create a new vaccine.
 *     tags:
 *       - Vaccine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VaccinePayload'
 *     responses:
 *       200:
 *         description: Vaccine created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vaccine:
 *                   $ref: '#/components/schemas/VaccineResponse'
 *                 message:
 *                   type: string
 *                   example: Vaccine created successfully
 */
router.post(
  routes.ROOT,
  upload.single("vaccineImage"),
  (req: Request, res: Response, next: NextFunction) =>
    vaccineController.createVaccines(req as RequestWithUser, res, next)
);

/**
 * @swagger
 * /vaccine/{id}:
 *   put:
 *     summary: Update the vaccine.
 *     parameters:
 *       - in: path
 *         name: id
 *     tags:
 *       - Vaccine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VaccinePayload'
 *     responses:
 *       200:
 *         description: Vaccine created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vaccine:
 *                   $ref: '#/components/schemas/VaccineResponse'
 *                 message:
 *                   type: string
 *                   example: Vaccine updated successfully
 */
router.put(
  routes.VACCINE_ID,
  upload.single("vaccineImage"),
  (req: Request, res: Response, next: NextFunction) =>
    vaccineController.updateVaccines(req as RequestWithUser, res, next)
);

/**
 * @swagger
 * /vaccine/{id}:
 *   delete:
 *     summary: Delete the vaccine.
 *     parameters:
 *       - in: path
 *         name: id
 *     tags:
 *       - Vaccine
 *     responses:
 *       200:
 *         description: Vaccine deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vaccine deleted successfully
 */
router.delete(routes.VACCINE_ID, vaccineController.deleteVaccines);

export default router;
