import { ApiError } from "./api-base.error";

export class NotFoundError extends ApiError {
  constructor(public readonly message?: string) {
    super(404, message ?? "Not Found Error");
  }
}
