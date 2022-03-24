export interface SignUpDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  username?: string;
  phoneNumber: string;
}
