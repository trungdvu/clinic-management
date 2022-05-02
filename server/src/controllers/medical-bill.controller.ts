import { Request, Response } from "express";
import {
  CreateMedicalBillDto,
  FindMedicalBillsQueryParams,
  MedicalBillResponse,
  MedicalBillSummaryResponse,
  UpdateMedicalBillDto,
  ViewDashboardSummaryTodayResponse,
} from "../dtos";
import { MedicalBillService } from "../services";
import { BodyResponse, ErrorResponseHandler, HttpStatusCode } from "../shared";

export class MedicalBillController {
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const query: FindMedicalBillsQueryParams = req.query;
      console.log("query: ", query);
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
      const body: CreateMedicalBillDto = req.body;

      await MedicalBillService.create(body);

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
      const body: UpdateMedicalBillDto = req.body;

      await MedicalBillService.update(id, body);

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

      await MedicalBillService.delete(id);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async viewDashboardTodaySummary(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const summaryToday = await MedicalBillService.viewDashboardSummary();

      const bodyResponse: BodyResponse<ViewDashboardSummaryTodayResponse> = {
        message: "Execute Successfully",
        data: summaryToday,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }
}
