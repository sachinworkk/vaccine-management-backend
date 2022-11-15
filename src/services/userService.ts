import UserModel from "../models/UserModel";
import RefreshTokenModel from "../models/RefreshTokenModel";
import { UserSigningUp, UserLoginCredentials } from "../domain/User";

import { signJWT, hashPassword, verifyPassword } from "./../utils/authUtil";

export const createUser = async (userData: UserSigningUp) => {
  const hashedPassword = await hashPassword(userData.password);

  const insertedData = await UserModel.createUser({
    ...userData,
    password: hashedPassword,
  });

  return {
    data: insertedData,
    message: "User created successfully",
  };
};

export const signInUser = async (userCredentials: UserLoginCredentials) => {
  const userSigningIn = await UserModel.getUserByEmail(userCredentials.email);

  if (!userSigningIn) throw new Error("User does not exist");

  const passwordVerification = await verifyPassword(
    userCredentials.password,
    userSigningIn.password
  );

  if (!passwordVerification) throw new Error("Password does not match");

  const accessToken = signJWT(
    {
      id: userSigningIn.id,
      name: userSigningIn.name,
      email: userSigningIn.email,
    },
    process.env.ACCESS_TOKEN_PRIVATE as string,
    "5s"
  );

  const refreshToken = signJWT(
    {
      userId: userSigningIn.id,
      name: userSigningIn.name,
      email: userSigningIn.email,
    },
    process.env.REFRESH_TOKEN_PRIVATE as string,
    "1y"
  );

  await RefreshTokenModel.createRefreshToken({
    token: refreshToken,
    user_id: userSigningIn.id,
  });

  return {
    data: {
      ...userSigningIn,
    },
    accessToken,
    refreshToken,
    message: "User logged in successfully",
  };
};
