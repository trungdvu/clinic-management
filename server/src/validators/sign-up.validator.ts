import { NextFunction, Request, Response } from "express";
import joi, { ObjectSchema } from "@hapi/joi";
import { BodyResponse } from "../shared";

interface SignUpValidationSchema {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
}

const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const signUpValidationSchema: ObjectSchema<SignUpValidationSchema> = joi
  .object()
  .keys({
    email: joi
      .string()
      .trim()
      .required()
      .email({ tlds: { allow: ["com", "net"] } })
      .messages({
        "string.email": "Email must be a valid email address",
        "string.empty": "Email is required",
      }),

    firstName: joi.string().trim().required().messages({
      "string.empty": "First Name is required",
    }),

    lastName: joi.string().trim().required().messages({
      "string.empty": "Last Name is required",
    }),

    password: joi
      .string()
      .trim()
      .required()
      .regex(strongPasswordRegex)
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base": "Wrong Password Format",
      }),

    passwordConfirm: joi
      .string()
      .allow(joi.ref("password"))
      .required()
      .messages({
        "string.disallow": "Password khong match",
      }),

    phoneNumber: joi.string().trim().required().messages({
      "string.empty": "Phone Number is required",
    }),
  });

export const signUpRequestValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = signUpValidationSchema.validate(req.body);
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
