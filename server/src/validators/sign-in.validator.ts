import joi, { ObjectSchema } from "@hapi/joi";
import { NextFunction, Request, Response } from "express";
import { BodyResponse } from "../shared";
import { HttpStatusCode } from "../shared/error/http-status-code";

interface SignInValidationSchema {
  email: string;
  password: string;
}

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const signInValidationSchema: ObjectSchema<SignInValidationSchema> = joi
  .object()
  .keys({
    email: joi.string().trim().required().email().messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
    }),

    password: joi
      .string()
      .trim()
      .required()
      .regex(strongPasswordRegex)
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base": "Incorrect password",
      }),
  });

export const signInRequestValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = signInValidationSchema.validate(req.body);
  if (error) {
    const bodyResponse: BodyResponse<void> = {
      message: error.message,
      statusCode: HttpStatusCode.BadRequest,
    };

    res.status(bodyResponse.statusCode).json(bodyResponse);
    return;
  }

  next();
};
