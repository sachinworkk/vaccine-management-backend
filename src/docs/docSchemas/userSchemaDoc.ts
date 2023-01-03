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
 *     UserLoggingIn:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/User'
 *
 *     UserLoggedIn:
 *       allOf:
 *         - type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               description: The user's access token.
 *               example: zxcxcadESDFXCVXCVZzxczxcszxcsxzx
 *             refreshToken:
 *               type: string
 *               description: The user's refresh token.
 *               example: zxcxcadESDFXCVXCVZzxczxcszxcsxzx
 *         - $ref: '#/components/schemas/UserLoggingIn'
 *
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
