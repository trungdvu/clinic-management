import { NextFunction, Request, Response } from "express";
import { IdentityService } from "../services";
import { BodyResponse } from "../shared";

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
      statusCode: 400,
    };
    res.status(403).json(bodyResponse);
    return;
  }
  const bearerToken = authorizationHeader.split(" ")[1];
  if (!bearerToken) {
    const bodyResponse: BodyResponse<void> = {
      message: "Unauthorized",
      statusCode: 401,
    };
    res.status(401).json(bodyResponse);
    return;
  }

  const isValidToken = await IdentityService.isValidToken(bearerToken);
  if (!isValidToken) {
    const bodyResponse: BodyResponse<void> = {
      message: "Forbidden",
      statusCode: 403,
    };
    res.status(403).json(bodyResponse);
    return;
  }

  next();
};
