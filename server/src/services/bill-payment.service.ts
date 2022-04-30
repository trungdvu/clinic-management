import { CreateBillPaymentDto, MedicalBillDetailResponse, MedicalBillResponse, PatientResponse } from "../dtos";
import { BillPaymentSummaryResponse } from "../dtos/bill-payment/bill-payment-summary.response";
import { FindBillPaymentsQueryParams } from "../dtos/bill-payment/find-bill-payment.query";
import { BillPayment, MedicalBill, MedicalBillDetail, Patient } from "../models";
import {
  BillPaymentRepository,
  DrugPriceRepository,
  MedicalBillDetailRepository,
  MedicalBillRepository,
  PatientRepository,
} from "../repositories";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
} from "../shared";
import { TokenService } from "./token.service";
import { RedisService } from "./redis.service";
import { BillPaymentResponse } from "../dtos/bill-payment/bill-payment.response";
import { PatientService } from "./patient.service";
import { MedicalBillDetailService } from "./medical-bill-detail.service";
import { UpdateBillPaymentDto } from "../dtos/bill-payment/update.dto";

export class BillPaymentService {
  static async findMany(
    query: FindBillPaymentsQueryParams
  ): Promise<BillPaymentSummaryResponse[]> {
    const { userId } = await TokenService.decode(
      TokenService.getCurrentToken()
    );
    try {
      const isExistedKey = await RedisService.has("bill-payments" + userId);
      if (isExistedKey) {
        const cachedData = await RedisService.get("bill-payments" + userId);
        return JSON.parse(cachedData) as BillPaymentSummaryResponse[];
      } else {
        const { patientId, medicalBillId } = query;
        if (patientId) {
          const isNotExistedPatientId = await this.isNotExistedPatientId(
            patientId
          );
          if (isNotExistedPatientId) {
            throw new BadRequestError("Patient Id Query Param Not existed");
          }
        }
        if (medicalBillId) {
          const isNotExistedMedicallBillId = await this.isNotExistedMedicalBillId(
            medicalBillId
          );
          if (isNotExistedMedicallBillId) {
            throw new BadRequestError("Medical Bill Id Query Param Not existed");
          }
        }

        const BillPaymentRecords: BillPayment[] = await BillPaymentRepository.findMany(
          userId,
          query
        );

      }
    } catch (error) {
      
    }
    const responses: BillPaymentSummaryResponse[] = [];
    return responses
  }

  static async update(id: string, dto: UpdateBillPaymentDto): Promise<string> {
    try {
      return await BillPaymentRepository.update(id, dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async findById(id: string): Promise<BillPaymentResponse> {
    try {
      const billPayment: BillPayment = await BillPaymentRepository.findById(id);
      const patient: PatientResponse = await PatientService.findById(billPayment.patientId)
      const medicalBillDetail: MedicalBillDetailResponse[] = await MedicalBillDetailService.findMany(billPayment.medicalBillId)

      return {
        id: billPayment.id,
        patient: patient,
        medicalExamCost: billPayment.medicalExamCost,
        drugDetails: medicalBillDetail,
        totalDrugCost: billPayment.totalDrugCost
      } as BillPaymentResponse;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async isNotExistedPatientId(patientId: string): Promise<boolean> {
    const patientFounded = await PatientRepository.findById(patientId);
    return patientFounded ? false : true;
  }

  static async isNotExistedMedicalBillId(medicalBillId: string): Promise<boolean> {
    const medicalBillFounded = await MedicalBillRepository.findById(medicalBillId);
    return medicalBillFounded ? false : true;
  }

  static async create(dto: CreateBillPaymentDto): Promise<void> {
    try {
      const { medicalBillId, patientId, medicalExamCost, totalDrugCost } = dto;

      const collections: CheckerCollections = [
        {
          argument: medicalBillId,
          argumentName: "Medical Bill Id",
        },
        {
          argument: patientId,
          argumentName: "Patient Id",
        },
      ];
      const checkerResult = Checker.isNullOrUndefinedBulk(collections);
      if (!checkerResult.succeed) {
        throw new BadRequestError(checkerResult.message);
      }

      const isMedicalBillIdNotExisted = await this.isMedicalBillIdNotExisted(
        medicalBillId
      );
      if (isMedicalBillIdNotExisted) {
        throw new BadRequestError(
          `Medical Bill Id: ${medicalBillId} was not existed!!!`
        );
      }

      const isPatientIdNotExisted = await this.isPatientIdNotExisted(patientId);
      if (isPatientIdNotExisted) {
        throw new BadRequestError(
          `Patient Id: ${patientId} was not existed!!!`
        );
      }

      const drugsCost: number = await this.calculateTotalCost(medicalBillId);

      const defaultDto: CreateBillPaymentDto = {
        ...dto,
        totalDrugCost: totalDrugCost ?? drugsCost,
      };

      await BillPaymentRepository.create(defaultDto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async calculateTotalCost(medicalBillId: string): Promise<number> {
    const medicalBillDetails: MedicalBillDetail[] = await MedicalBillDetailRepository.findManyByMedicalBillId(
      medicalBillId
    );

    let drugsCost = 0;
    for (const medicalBillDetail of medicalBillDetails) {
      const drugPrice: number = await DrugPriceRepository.findPrice(
        medicalBillDetail.drugId,
        medicalBillDetail.unitId
      );

      drugsCost += drugPrice * medicalBillDetail.quantity;
    }

    return drugsCost;
  }

  static async isMedicalBillIdNotExisted(
    medicalBillId: string
  ): Promise<boolean> {
    const medicalBillFounded: MedicalBill = await MedicalBillRepository.findById(
      medicalBillId
    );
    return medicalBillFounded ? false : true;
  }

  static async isPatientIdNotExisted(patientId: string): Promise<boolean> {
    const patientFounded: Patient = await PatientRepository.findById(patientId);
    return patientFounded ? false : true;
  }

  static async delete(id: string): Promise<void> {
    try {
      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );
      await BillPaymentRepository.delete(id);
      await RedisService.remove("bill-payments" + userId);
    } catch (error) {
      ErrorHandler(error);
    }
  }

}
