import { Request, Response } from "express";
import { SignInDto, SignInResponse, SignUpDto } from "../dtos";
import { IdentityService } from "../services";
import { BodyResponse, ErrorResponseHandler, HttpStatusCode } from "../shared";

export class IdentityController {
  static async signIn(req: Request, res: Response): Promise<void> {
    try {
      const signInDto: SignInDto = req.body;
      const response: SignInResponse = await IdentityService.signIn(signInDto);

      const bodyResponse: BodyResponse<SignInResponse> = {
        message: "Execute Successfully",
        data: response,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async signUp(req: Request, res: Response): Promise<void> {
    try {
      const signUpDto: SignUpDto = req.body;

      await IdentityService.signUp(signUpDto);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: HttpStatusCode.OK,
      };
      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }
}
