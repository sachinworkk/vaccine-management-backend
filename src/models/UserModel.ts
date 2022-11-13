import db from "../db/db";

import { UserSigningUp } from "./../domain/User";

class UserModel {
  public static createUser = async (user: UserSigningUp) => {
    const newUser = await db("users").insert(user, [
      "id",
      "name",
      "gender",
      "date_of_birth",
      "email",
      "address",
      "profile_image_url",
    ]);

    return newUser;
  };
}

export default UserModel;
