import { NextFunction, Request, Response } from "express";
import joi, { ObjectSchema } from "@hapi/joi";
import { BodyResponse } from "../shared";

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
      "string.trim": "Email may not contain any spaces at the beginning or end", // seems to be unnecessary
      "string.empty": "Email is required",
    }),

    password: joi
      .string()
      .trim()
      .required()
      .regex(strongPasswordRegex)
      .messages({
        "string.email": "Password must be a valid email address",
        "string.trim":
          "Password may not contain any spaces at the beginning or end", // seems to be unnecessary
        "string.pattern.base": "Wrong Password Format",
      }),
  });

export const signInRequestValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("req.body ne:", req.body);

  const { error } = signInValidationSchema.validate(req.body);
  console.log("error ne:", error);

  if (error) {
    const bodyResponse: BodyResponse<void> = {
      message: error.message,
      statusCode: 400,
    };

    res.status(bodyResponse.statusCode).json(bodyResponse);
    return;
  }
  next();
};
