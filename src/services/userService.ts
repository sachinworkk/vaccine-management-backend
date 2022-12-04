import UserModel from "../models/userModel";
import RefreshTokenModel from "../models/refreshTokenModel";

import { JWT_SIGN_AGE, NUMBER_OF_SALT } from "./../constants/constants";

import { validateSignUp } from "./../schemas/signUpSchema";

import { AppError } from "./../misc/appError";

import { signJWT, hashPassword, verifyPassword } from "./../utils/authUtil";

import { UserSigningUp, UserLoginCredentials } from "../types/user";

/**
 * Create a new user.
 *
 * @param userData {Object}
 * @returns {Object}
 */
export const createUser = async (userData: UserSigningUp) => {
  const { error } = validateSignUp(userData);

  if (error) throw error;

  const hashedPassword = await hashPassword(userData.password, NUMBER_OF_SALT);

  const { confirmPassword, ...userSignUpData } = userData;

  const insertedData = await UserModel.createUser({
    ...userSignUpData,
    password: hashedPassword,
  });

  return {
    data: insertedData,
    message: "User created successfully",
  };
};

/**
 * Sign in a new user.
 *
 * @param userCredentials {Object}
 * @returns {Object}
 */
export const signInUser = async (userCredentials: UserLoginCredentials) => {
  const userSigningIn = await UserModel.getUserByEmail(userCredentials.email);

  if (!userSigningIn) throw new AppError(400, "Username not found");

  const passwordVerification = await verifyPassword(
    userCredentials.password,
    userSigningIn.password
  );

  if (!passwordVerification)
    throw new AppError(400, "Invalid username or password");

  const accessToken = signJWT(
    {
      userId: userSigningIn.id,
      name: userSigningIn.name,
      email: userSigningIn.email,
    },
    process.env.ACCESS_TOKEN_PRIVATE as string,
    JWT_SIGN_AGE.ACCESS_TOKEN
  );

  const refreshToken = signJWT(
    {
      userId: userSigningIn.id,
      name: userSigningIn.name,
      email: userSigningIn.email,
    },
    process.env.REFRESH_TOKEN_PRIVATE as string,
    JWT_SIGN_AGE.REFRESH_TOKEN
  );

  await RefreshTokenModel.createRefreshToken({
    token: refreshToken,
    userId: userSigningIn.id,
  });

  return {
    user: {
      ...userSigningIn,
    },
    accessToken,
    refreshToken,
    message: "User logged in successfully",
  };
};

/**
 * Sign out the user.
 *
 * @param refreshToken
 * @returns {Promise}
 */
export const signOutUser = async (refreshToken: string) => {
  return await RefreshTokenModel.deleteRefreshToken(refreshToken);
};
