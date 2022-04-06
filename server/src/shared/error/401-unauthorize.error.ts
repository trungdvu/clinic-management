import { ApiError } from "./api-base.error";

export class UnauthorizedError extends ApiError {
  constructor(public readonly message?: string) {
    super(401, message ?? "Unauthorized");
  }
}
