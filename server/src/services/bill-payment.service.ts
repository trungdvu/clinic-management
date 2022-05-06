import { BillPaymentResponse, BillPaymentSummaryResponse, CreateBillPaymentDto, MedicalBillDetailResponse, PatientResponse } from "../dtos";
import { BillPayment, MedicalBill, MedicalBillDetail, MedicalBillStatus, Patient } from "../models";
import { TokenService } from './token.service';
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
  NotFoundError,
} from "../shared";
import { MedicalBillDetailService } from "./medical-bill-detail.service";
import _ from "lodash";
import { BillPaymentStatus } from '../models/bill-payment.model';

export class BillPaymentService {
  static async findMany(): Promise<BillPaymentSummaryResponse[]> {
    try {
      const records: BillPayment[] = await BillPaymentRepository.findMany();
      const responses: BillPaymentSummaryResponse[] = records.map(
        (record: BillPayment) => {
          return {
            id: record.id,
            patient: record.patient,
            createdBy: record.createdBy,
            medicalExamCost: record.medicalExamCost,
            totalDrugCost: record.totalDrugCost,
            status: record.status,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
          } as BillPaymentSummaryResponse;
        }
      );

      return responses;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async findById(id: string): Promise<BillPaymentResponse> {
    try {
      const record: BillPayment = await BillPaymentRepository.findById(id);
      if (!record) {
        throw new NotFoundError(`Bill Payment id ${id} was not found`);
      }

      const patientResponse: PatientResponse = {
        id: record.patient.id,
        fullName: record.patient.fullName,
        gender: record.patient.gender,
        dayOfBirth: record.patient.dayOfBirth,
        address: record.patient.address,
        phoneNumber: record.patient.phoneNumber,
        createdAt: record.patient.createdAt,
        creatorId: record.patient.creatorId,
      };

      const drugDetailResponses: MedicalBillDetailResponse[] = await MedicalBillDetailService.findMany(
        record.medicalBillId
      );
      const totalDrugCost: number = drugDetailResponses.reduce(
        (totalMoney, drug) => totalMoney + drug.price,
        0
      );

      const response: BillPaymentResponse = {
        id: record.id,
        patient: patientResponse,
        medicalExamCost: record.medicalExamCost,
        drugDetails: drugDetailResponses ?? [],
        status: record.status,
        totalDrugCost: totalDrugCost,
        createdAt: record.createdAt,
        createdBy: record.createdBy,
      };

      return response;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async create(dto: CreateBillPaymentDto): Promise<void> {
    try {
      const { medicalBillId, patientId, totalDrugCost } = dto;
      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );

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
        createdBy: userId,
        totalDrugCost: totalDrugCost ?? drugsCost,
      };

      const result = await BillPaymentRepository.create(defaultDto);

      if (result) {
        await MedicalBillRepository.update(medicalBillId, {
          status: MedicalBillStatus.Completed,
        });
      }
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

  static async markCompleted(id: string): Promise<void> {
    try {
      const recordFounded: BillPayment = await BillPaymentRepository.findById(id);
      if(!recordFounded) {
        throw new NotFoundError(`Bill Payment Id: ${id} was not found`);
      }
      
      await BillPaymentRepository.updateStatus(id, BillPaymentStatus.Completed);

      await MedicalBillRepository.update(recordFounded.medicalBillId, {
        status: MedicalBillStatus.Completed,
      });

    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await BillPaymentRepository.delete(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
