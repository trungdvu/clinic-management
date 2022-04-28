import { NextFunction, Request, Response } from "express";
import { IdentityService } from "../services";
import { BodyResponse } from "../shared";
import { HttpStatusCode } from "../shared/error/http-status-code";

const getBearerToken = (req: Request) => {
  const authorizationHeader = req.headers["authorization"];

  return authorizationHeader.split(" ")[1];
};

export const verifyUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    const bodyResponse: BodyResponse<void> = {
      message: "Token was not provided",
      statusCode: HttpStatusCode.NotFound,
    };
    res.status(bodyResponse.statusCode).json(bodyResponse);
    return;
  }
  const bearerToken = authorizationHeader.split(" ")[1];
  if (!bearerToken) {
    const bodyResponse: BodyResponse<void> = {
      message: "Unauthorized",
      statusCode: HttpStatusCode.Unauthorized,
    };
    res.status(bodyResponse.statusCode).json(bodyResponse);
    return;
  }

  const isValidToken = await IdentityService.isValidToken(bearerToken);
  if (!isValidToken) {
    const bodyResponse: BodyResponse<void> = {
      message: "Forbidden",
      statusCode: HttpStatusCode.Forbidden,
    };
    res.status(bodyResponse.statusCode).json(bodyResponse);
    return;
  }

  next();
};
