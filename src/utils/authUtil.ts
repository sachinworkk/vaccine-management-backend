import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Hashes and returns has password.
 *
 * @param {string} password
 * @param {number} numberOfSalt
 *
 * @returns {string}
 */
export const hashPassword = async (password: string, numberOfSalt: number) => {
  const salt = await bcrypt.genSalt(numberOfSalt);

  return bcrypt.hash(password, salt);
};

/**
 * Checks if is valid password.
 *
 * @param {string} password
 * @param {string} hashedPassword
 *
 * @returns Boolean
 */
export const verifyPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Signs the jwt.
 *
 * @param {payload} mimeType
 * @param {string} privateKey
 * @param {string | number} expiresIn
 *
 * @returns {string}
 */
export const signJWT = (
  payload: object,
  privateKey: string,
  expiresIn: string | number
) => {
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn,
  });
};

/**
 * Verifies the JWT.
 *
 * @param {string} token
 * @param {string} token
 * @param {string} publicKey
 *
 * @returns object
 */
export const verifyJWT = (token: string, publicKey: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return {
      payload: null,
      expired: (error as Error).message.includes("jwt expired"),
    };
  }
};
