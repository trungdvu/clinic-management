import { ApiError } from "./api-base.error";

export class BadRequestError extends ApiError {
  constructor(public readonly message?: string) {
    super(400, message ?? "Bad Request Error");
  }
}
