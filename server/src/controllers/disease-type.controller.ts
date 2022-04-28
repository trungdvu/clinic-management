import { Request, Response } from "express";
import { DiseaseTypeResponse } from "../dtos";
import { DiseaseTypeService } from "../services";
import { BodyResponse, ErrorResponseHandler } from "../shared";

export class DiseaseTypeController {
  static async findAll(request: Request, response: Response): Promise<void> {
    try {
      const diseaseTypeResponse = await DiseaseTypeService.findMany();
      const responseBody: BodyResponse<DiseaseTypeResponse[]> = {
        message: "Execute Successfully",
        data: diseaseTypeResponse,
        statusCode: 200,
      };

      response.status(responseBody.statusCode).json(responseBody);
    } catch (error) {
      ErrorResponseHandler(error, response);
    }
  }
}
