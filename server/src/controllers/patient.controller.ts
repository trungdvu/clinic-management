import { Request, Response } from "express";
import {
  CreatePatientDto,
  FindPatientsQuery,
  PatientResponse,
  UpdatePatientDto,
} from "../dtos";
import { PatientService } from "../services";
import { BodyResponse, ErrorResponse } from "../shared";

export class PatientController {
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const query: FindPatientsQuery = req.query;
      const response: PatientResponse[] = await PatientService.findMany(query);

      const bodyResponse: BodyResponse<PatientResponse[]> = {
        message: "Execute Successfully",
        data: response,
        statusCode: 200,
      };

      res.status(200).json(bodyResponse);
    } catch (error) {
      ErrorResponse(error, res);
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreatePatientDto = req.body;
      const response: string = await PatientService.create(dto);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: 200,
      };

      res.status(200).json(bodyResponse);
    } catch (error) {
      ErrorResponse(error, res);
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdatePatientDto = req.body;
      const response: string = await PatientService.update(id, dto);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: 200,
      };

      res.status(200).json(bodyResponse);
    } catch (error) {
      ErrorResponse(error, res);
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const response: string = await PatientService.delete(id);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: 200,
      };

      res.status(200).json(bodyResponse);
    } catch (error) {
      ErrorResponse(error, res);
    }
  }
}
