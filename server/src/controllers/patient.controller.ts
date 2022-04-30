import { Request, Response } from "express";
import {
  CreatePatientDto,
  FindPatientsQuery,
  PatientResponse,
  UpdatePatientDto,
} from "../dtos";
import { PatientService } from "../services";
import { BodyResponse, ErrorResponseHandler, HttpStatusCode } from "../shared";

export class PatientController {
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const query: FindPatientsQuery = req.query;
      const response: PatientResponse[] = await PatientService.findMany(query);

      const bodyResponse: BodyResponse<PatientResponse[]> = {
        message: "Execute Successfully",
        data: response,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const response: PatientResponse = await PatientService.findById(id);

      const bodyResponse: BodyResponse<PatientResponse> = {
        message: "Execute Successfully",
        data: response,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreatePatientDto = req.body;

      await PatientService.create(dto);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdatePatientDto = req.body;

      await PatientService.update(id, dto);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await PatientService.delete(id);

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
