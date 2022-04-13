import { BadRequestError } from "./400-bad-request.error";
import { NotFoundError } from "./404-not-found.error";
import { UnauthorizedError } from "./401-unauthorize.error";
import { InternalServerError } from "./500-internal-server.error";

export const ErrorHandler = (error: Error): void => {
  if (error instanceof BadRequestError) {
    throw new BadRequestError(error.message);
  }
  if (error instanceof NotFoundError) {
    throw new NotFoundError(error.message);
  }
  if (error instanceof UnauthorizedError) {
    throw new UnauthorizedError(error.message);
  }
  if (error instanceof InternalServerError) {
    throw new InternalServerError(error.message);
  }

  throw new Error(error.message);
};
