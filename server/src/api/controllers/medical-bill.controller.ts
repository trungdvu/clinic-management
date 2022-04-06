import { Request, Response } from "express";
import {
  CreateMedicalBillDto,
  MedicalBillResponse,
  UpdateMedicalBillDto,
} from "../dtos";

import { MedicalBillService } from "../services";
import { BodyResponse, ErrorResponse } from "../../shared";

export class MedicalBillController {
  static async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const medicalBillFounded = await MedicalBillService.findById(id);

      const bodyResponse: BodyResponse<MedicalBillResponse> = {
        message: "Execute Successfully",
        data: medicalBillFounded,
        statusCode: 200,
      };

      res.status(200).json(bodyResponse);
    } catch (error) {
      ErrorResponse(error, res);
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const body: CreateMedicalBillDto = req.body;

      const response = await MedicalBillService.create(body);

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
      const body: UpdateMedicalBillDto = req.body;

      const response = await MedicalBillService.update(id, body);

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

      const response = await MedicalBillService.delete(id);

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
