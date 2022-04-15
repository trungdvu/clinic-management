import { Request, Response } from "express";
import {
  CreateMedicalBillDetailDto,
  FindMedicalBillsQueryParams,
  MedicalBillResponse,
  MedicalBillSummaryResponse,
  UpdateMedicalBillDetailDto,
} from "../dtos";
import { MedicalBillDetailService, MedicalBillService } from "../services";
import { BodyResponse, ErrorResponse } from "../shared";

export class MedicalBillDetailController {
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const query: FindMedicalBillsQueryParams = req.query;
      const medicalBillSummaryResponses = await MedicalBillService.findMany(
        query
      );

      const bodyResponse: BodyResponse<MedicalBillSummaryResponse[]> = {
        message: "Execute Successfully",
        data: medicalBillSummaryResponses,
        statusCode: 200,
      };

      res.status(200).json(bodyResponse);
    } catch (error) {
      ErrorResponse(error, res);
    }
  }

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
      const body: CreateMedicalBillDetailDto = req.body;

      await MedicalBillDetailService.create(body);

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
      const body: UpdateMedicalBillDetailDto = req.body;

      await MedicalBillDetailService.update(id, body);

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

      await MedicalBillDetailService.delete(id);

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
