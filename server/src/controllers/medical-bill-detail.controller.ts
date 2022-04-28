import { Request, Response } from "express";
import {
  CreateMedicalBillDetailDto,
  FindMedicalBillsQueryParams,
  MedicalBillResponse,
  MedicalBillSummaryResponse,
  UpdateMedicalBillDetailDto,
} from "../dtos";
import { MedicalBillDetailService, MedicalBillService } from "../services";
import { BodyResponse, ErrorResponseHandler, HttpStatusCode } from "../shared";

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
      const medicalBillFounded = await MedicalBillService.findById(id);

      const bodyResponse: BodyResponse<MedicalBillResponse> = {
        message: "Execute Successfully",
        data: medicalBillFounded,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const body: CreateMedicalBillDetailDto = req.body;

      await MedicalBillDetailService.create(body);
      console.log("what the fuck");

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
      const body: UpdateMedicalBillDetailDto = req.body;

      await MedicalBillDetailService.update(id, body);

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

      await MedicalBillDetailService.delete(id);

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
