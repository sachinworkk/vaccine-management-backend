// User interface
export interface User {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  address: string;
  password: string;
  confirmPassword?: string;
  profileImageUrl?: string;
}

export interface UserLoginCredentials {
  email: string;
  password: string;
}

// User data when creating the user (no id column)
export type UserSigningUp = Omit<User, "id">;

// User data when getting the user data from backend (no password column)
export type UserSigningIn = Omit<User, "password">;
