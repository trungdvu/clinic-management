import { Request, Response } from "express";
import {
  DrugUsageReportResponse,
  FindDrugUsageReportQueryParams,
  FindMonthlyRevenueReportQueryParams,
  MonthlyRevenueReportResponse,
} from "../dtos";
import { ReportService } from "../services";
import { BodyResponse, ErrorResponseHandler, HttpStatusCode } from "../shared";

export class ReportController {
  static async getMonthlyRevenueReport(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const query: FindMonthlyRevenueReportQueryParams = req.query;
      const monthlyRevenueReportData: MonthlyRevenueReportResponse[] = await ReportService.calculateMonthlyRevenue(
        query
      );

      const bodyResponse: BodyResponse<MonthlyRevenueReportResponse[]> = {
        message: "Execute Successfully",
        data: monthlyRevenueReportData,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }

  static async getDrugUsageReport(
    req: Request,
    res: Response
  ) {
    try {
      const query: FindDrugUsageReportQueryParams = req.query;
      const drugUsageReportData: DrugUsageReportResponse[] = await ReportService.calculateDrugUsage(
        query
      );

      const bodyResponse: BodyResponse<DrugUsageReportResponse[]> = {
        message: "Execute Successfully",
        data: drugUsageReportData,
        statusCode: HttpStatusCode.OK,
      };

      res.status(bodyResponse.statusCode).json(bodyResponse);
    } catch (error) {
      ErrorResponseHandler(error, res);
    }
  }
}
