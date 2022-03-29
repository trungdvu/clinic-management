import { ApiError } from "./api-base.error";

export class Unauthorized extends ApiError {
  constructor(public readonly message?: string) {
    super(401, message ?? "Unauthorized");
  }
}
