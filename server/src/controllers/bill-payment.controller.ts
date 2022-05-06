import { Request, Response } from "express";
import { BillPaymentResponse, BillPaymentSummaryResponse, CreateBillPaymentDto } from "../dtos";
import { BillPaymentService } from "../services";
import { BodyResponse, ErrorResponseHandler, HttpStatusCode } from "../shared";

export class BillPaymentController {
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const responses: BillPaymentSummaryResponse[] = await BillPaymentService.findMany();

      const bodyResponse: BodyResponse<BillPaymentSummaryResponse[]> = {
        message: "Execute Successfully",
        data: responses,
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
      const response: BillPaymentResponse = await BillPaymentService.findById(
        id
      );

      const bodyResponse: BodyResponse<BillPaymentResponse> = {
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
      const dto: CreateBillPaymentDto = req.body;

      await BillPaymentService.create(dto);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async markCompleted(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await BillPaymentService.markCompleted(id);

      const bodyResponse: BodyResponse<BillPaymentResponse> = {
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
      await BillPaymentService.delete(id);

      const bodyResponse: BodyResponse<BillPaymentResponse> = {
        message: "Execute Successfully",
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }
}
