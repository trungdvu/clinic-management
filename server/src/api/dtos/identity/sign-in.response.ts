import { UserResponse } from "./user.response";

export interface SignInResponse {
  accessToken: string;
  profile?: UserResponse;
}
