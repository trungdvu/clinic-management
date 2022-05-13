import { TokenService } from "./token.service";
import {
  DrugUsageReportResponse,
  FindDrugUsageReportQueryParams,
  FindMonthlyRevenueReportQueryParams,
  MonthlyRevenueReportResponse,
} from "../dtos";
import {
  DrugRepository,
  IdentityRepository,
  MedicalBillDetailRepository,
  UnitRepository,
} from "../repositories";
import { getNumberDayOfMonth, formatDate } from "../utils";
import {
  BillPayment,
  BillPaymentStatus,
  Drug,
  MedicalBillDetail,
  Patient,
} from "../models";
import { ErrorHandler } from "../shared";

export class ReportService {
  static async calculateMonthlyRevenue(
    query: FindMonthlyRevenueReportQueryParams
  ): Promise<MonthlyRevenueReportResponse[]> {
    try {
      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );
      const parsedMonth = parseInt(query.month.toString());
      const parsedYear = parseInt(query.year.toString());

      const responses: MonthlyRevenueReportResponse[] = [];
      const numberDateInMonth: number = getNumberDayOfMonth(
        parsedMonth,
        parsedYear
      );

      const foundedUser = await IdentityRepository.findById(userId);

      for (let dayInMonth = 1; dayInMonth <= numberDateInMonth; ++dayInMonth) {
        const filteredPatients: Patient[] = foundedUser.patients.filter(
          (patient: Patient) => {
            const [day, month, year] = formatDate(patient.createdAt);

            return (
              day === dayInMonth && month === parsedMonth && year === parsedYear
            );
          }
        );

        const totalRevenue: number = foundedUser.billPayments.reduce(
          (totalSum: number = 0, currentBillPayment: BillPayment) => {
            const [day, month, year] = formatDate(currentBillPayment.createdAt);

            if (
              day === dayInMonth &&
              month === parsedMonth &&
              year === parsedYear &&
              currentBillPayment.status === BillPaymentStatus.Completed
            ) {
              return (
                totalSum +
                (currentBillPayment.totalDrugCost +
                  currentBillPayment.medicalExamCost)
              );
            }

            return totalSum;
          },
          0
        );

        const response: MonthlyRevenueReportResponse = {
          day: dayInMonth,
          numberOfPatient: filteredPatients.length,
          revenue: totalRevenue,
        };

        responses.push(response);
      }

      return responses;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static isDifferentDrug = (current: Drug, iteration: Drug) => {
    return current.id !== iteration.id;
  };

  static async calculateDrugUsage(
    query: FindDrugUsageReportQueryParams
  ): Promise<DrugUsageReportResponse[]> {
    try {
      const parsedMonth = parseInt(query.month.toString());
      const parsedYear = parseInt(query.year.toString());

      // TODO: Refactor code performance
      const drugRecords: Drug[] = await DrugRepository.findMany();
      let responses: DrugUsageReportResponse[] = [];
      let currentDrug: Drug = drugRecords[0];
      let isDifferentDrugType: boolean = true;

      for (const drug of drugRecords) {
        if (this.isDifferentDrug(currentDrug, drug)) {
          isDifferentDrugType = true;
          currentDrug = drug;
        }

        for (const medicalBillDetail of drug.medicalBillDetails) {
          const [day, month, year] = formatDate(medicalBillDetail.createdAt);

          if (
            month === parsedMonth &&
            year === parsedYear &&
            isDifferentDrugType
          ) {
            const foundedUnit = await UnitRepository.findById(
              medicalBillDetail.unitId
            );

            const quantity = drug.medicalBillDetails.reduce(
              (
                totalQuantity: number,
                currentMedicalBillDetail: MedicalBillDetail
              ) => totalQuantity + currentMedicalBillDetail.quantity,
              0
            );

            const response: DrugUsageReportResponse = {
              drug: {
                id: drug.id,
                description: drug.description,
              },
              unit: {
                id: foundedUnit.id,
                description: foundedUnit.description,
              },
              quantity,
              numberOfUse: drug.medicalBillDetails.length,
            };

            responses.push(response);
            isDifferentDrugType = false;
          }
        }
      }

      return responses;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
