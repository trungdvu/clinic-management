import { Request, Response } from "express";
import { UnitPriceInputByDrugResponse, UnitResponse } from "../dtos";
import { UnitService } from "../services";
import { BodyResponse } from "../shared";
import { ErrorResponseHandler } from "../shared/error/error.response";
import { HttpStatusCode } from "../shared/error/http-status-code";

export class UnitController {
  static async findAllByDrugId(req: Request, res: Response): Promise<void> {
    try {
      const { drugId } = req.query;
      const unitPriceResponse: UnitPriceInputByDrugResponse[] = await UnitService.findManyByDrugId(
        drugId as string
      );
      const bodyResponse: BodyResponse<UnitPriceInputByDrugResponse[]> = {
        message: "Execute Successfully",
        data: unitPriceResponse,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }
}
