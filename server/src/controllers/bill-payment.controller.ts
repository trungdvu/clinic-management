import { Request, Response } from "express";
import { CreateBillPaymentDto } from "../dtos";
import { BillPaymentService } from "../services";
import { BodyResponse, ErrorResponseHandler } from "../shared";

export class BillPaymentController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateBillPaymentDto = req.body;

      await BillPaymentService.create(dto);

      const bodyResponse: BodyResponse<void> = {
        message: "Execute Successfully",
        statusCode: 200,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }
}
