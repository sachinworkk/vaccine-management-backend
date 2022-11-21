// User interface
export interface User {
  id: number;
  name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  password: string;
  address: string;
  profile_image_url?: string;
}

export interface UserLoginCredentials {
  email: string;
  password: string;
}

// User data when creating the user (no id column)
export type UserSigningUp = Omit<User, "id">;

// User data when getting the user data from backend (no password column)
export type UserSigningIn = Omit<User, "password">;
