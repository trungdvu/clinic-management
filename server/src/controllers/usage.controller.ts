import { Request, Response } from "express";
import { UsageResponse } from "../dtos";
import { UsageService } from "../services";
import { BodyResponse } from "../shared";
import { ErrorResponseHandler } from "../shared/error/error.response";
import { HttpStatusCode } from "../shared/error/http-status-code";

export class UsageController {
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const usages = await UsageService.findMany();

      const bodyResponse: BodyResponse<UsageResponse[]> = {
        message: "Execute Successfully",
        data: usages,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }
}
