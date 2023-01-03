/**
 * @swagger
 * components:
 *   schemas:
 *     Vaccine:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The vaccines's name.
 *           example: Phizer
 *         stage:
 *           type: string
 *           description: The vaccines's stage.
 *           example: Exploratory
 *         description:
 *           type: string
 *           description: The vaccine's description.
 *           example: This is a vaccine for COVID.
 *         numberOfDoses:
 *           type: number
 *           description: The vaccine's number of doses.
 *           example: 4
 *         isMandatory:
 *           type: boolean
 *           description: The vaccine's is mandatory.
 *           example: true
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
 *     VaccinePayload:
 *       allOf:
 *         - type: object
 *           properties:
 *             vaccineImage:
 *               type: file
 *               description: The vaccine's image.
 *               example: vaccine.img
 *         - $ref: '#/components/schemas/Vaccine'
 *
 *     VaccineResponse:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The vaccine ID.
 *               example: 14
 *             vaccineImageURL:
 *               type: string
 *               description: The vaccine's image URL.
 *               example: https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670903226/vaccine-management/vaccines/btsm2zdjsddhdpxir9vs.png
 *         - $ref: '#/components/schemas/Vaccine'
 */
