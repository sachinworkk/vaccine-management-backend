import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

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
