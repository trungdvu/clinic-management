export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends SignInPayload {
  firstName: string;
  lastName: string;
  passwordConfirm: string;
  phoneNumber: string;
}

export interface User {
  id: string;
  username?: string;
  firstName: string;
  lastName: string;
  phone: string;
}
