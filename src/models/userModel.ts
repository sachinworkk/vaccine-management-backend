import db from "../db/db";

import { UserSigningUp } from "../types/user";

class UserModel {
  public static createUser = async (user: UserSigningUp) => {
    const newUser = await db("users").insert(user, [
      "id",
      "name",
      "gender",
      "date_of_birth",
      "email",
      "address",
    ]);

    return newUser;
  };

  public static getUserByEmail = async (email: string) => {
    const user = await db("users").where({ email }).first();

    return user;
  };
}

export default UserModel;
