import { Request, Response } from "express";
import { SignInDto, SignInResponse } from "../dtos";
import { SignUpDto } from "../dtos";
import { IdentityService } from "../services";
import { BodyResponse, ErrorHandler } from "../../shared";
import { IdentityRepository } from "../repositories";

const identityService = new IdentityService(new IdentityRepository());

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const signInDto: SignInDto = req.body;
    const response: SignInResponse = await identityService.signIn(signInDto);

    const bodyResponse: BodyResponse<SignInResponse> = {
      message: "Execute Successfully",
      data: response,
      statusCode: 200,
    };

    res.status(200).json(bodyResponse);
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const signUpDto: SignUpDto = req.body;

    const response = await identityService.signUp(signUpDto);

    const bodyResponse: BodyResponse<void> = {
      message: "Execute Successfully",
      statusCode: 200,
    };
    res.status(200).json(bodyResponse);
  } catch (error) {
    ErrorHandler(error, res);
  }
};
