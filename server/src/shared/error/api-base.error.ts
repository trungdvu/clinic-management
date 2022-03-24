export class ApiError {
  constructor(
    public readonly statusCode: number,
    public readonly message?: string
  ) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
