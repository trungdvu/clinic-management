import { Request, Response } from "express";
import { DrugResponse } from "../dtos";
import { DrugService } from "../services";
import { BodyResponse } from "../shared";
import { ErrorResponseHandler } from "../shared/error/error.response";
import { HttpStatusCode } from "../shared/error/http-status-code";

export class DrugController {
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const drugResponses: DrugResponse[] = await DrugService.findMany();

      const bodyResponse: BodyResponse<DrugResponse[]> = {
        message: "Execute Successfully",
        data: drugResponses,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }
}
