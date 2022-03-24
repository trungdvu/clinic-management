import { ApiError } from "./api-base.error";

export class InternalServerError extends ApiError {
  constructor(public readonly message?: string) {
    super(500, message ?? "Internal Server Error");
  }
}
