import { Request, Response } from "express";
import { CreateBillPaymentDto } from "../dtos";
import { FindBillPaymentsQueryParams } from "../dtos/bill-payment/find-bill-payment.query";
import { BillPaymentService } from "../services";
import { BodyResponse, ErrorResponseHandler, HttpStatusCode } from "../shared";

export class BillPaymentController {
  static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const query: FindBillPaymentsQueryParams = req.query;
      const billPaymentSummaryResponses = await BillPaymentService.findMany(
        query
      );
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
}
