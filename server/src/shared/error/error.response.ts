import { Response } from "express";
import { BodyResponse } from "../api.response";
import { ApiError } from "./api-base.error";

export const ErrorResponseHandler = (
  error: Error,
  expressResponse: Response
) => {
  if (error instanceof ApiError) {
    const errorMessage: BodyResponse<void> = {
      message: error.message,
      statusCode: error.statusCode,
    };

    expressResponse.status(error.statusCode).json(errorMessage);
  }
};
