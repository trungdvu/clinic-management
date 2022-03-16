export interface SignInPayload {
  username: string;
  password: string;
}

export interface SignUpPayload extends SignInPayload {
  displayName?: string;
  dayOfBirth?: string;
}

export interface User {
  uid: string;
  username: string;
  displayName?: string;
  photoURL?: string;
  type?: string;
  age?: string;
  createdAt?: string;
  updatedAt?: string;
}
