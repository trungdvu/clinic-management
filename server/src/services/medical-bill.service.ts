import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
  InternalServerError,
} from "../shared";
import {
  CreateMedicalBillDto,
  DrugResponse,
  FindMedicalBillsQueryParams,
  MedicalBillResponse,
  MedicalBillSummaryResponse,
  UpdateMedicalBillDto,
} from "../dtos";
import {
  MedicalBillDetailRepository,
  MedicalBillRepository,
} from "../repositories";
import { MedicalBill } from "../models";

export class MedicalBillService {
  static async findMany(
    query: FindMedicalBillsQueryParams
  ): Promise<MedicalBillSummaryResponse[]> {
    try {
      const medicalBillRecords: MedicalBill[] = await MedicalBillRepository.findMany(
        query
      );

      return medicalBillRecords.map((record) => {
        return {
          id: record.id,
          diseaseTypeId: record.diseaseTypeId,
          prediction: record.prediction,
          symptomDescription: record.symptomDescription,
          status: record.status,
          patientFullName: record.patient.fullName,
          createdAt: record.createdAt,
        } as MedicalBillSummaryResponse;
      });
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async findById(id: string): Promise<MedicalBillResponse> {
    try {
      const medicalBill = await MedicalBillRepository.findById(id);
      const drugResponses: DrugResponse[] = await MedicalBillDetailRepository.findMany(
        medicalBill.id
      );

      return {
        id: medicalBill.id,
        diseaseTypeId: medicalBill.diseaseTypeId,
        prediction: medicalBill.prediction,
        symptomDescription: medicalBill.symptomDescription,
        patientId: medicalBill.patientId,
        drugs: drugResponses,
      } as MedicalBillResponse;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async create(dto: CreateMedicalBillDto): Promise<any> {
    try {
      const { diseaseTypeId, symptomDescription, prediction, patientId } = dto;
      const collections: CheckerCollections = [
        {
          argument: diseaseTypeId,
          argumentName: "Disease Type Id",
        },
        {
          argument: symptomDescription,
          argumentName: "Symptom Description",
        },
        {
          argument: prediction,
          argumentName: "Prediction",
        },
        {
          argument: patientId,
          argumentName: "Patient Id",
        },
      ];
      const checkerResult = Checker.isNullOrUndefinedBulk(collections);
      if (!checkerResult.succeed) {
        return new BadRequestError(checkerResult.message as string);
      }

      return await MedicalBillRepository.create(dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async update(id: string, dto: UpdateMedicalBillDto): Promise<string> {
    try {
      return await MedicalBillRepository.update(id, dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await MedicalBillRepository.delete(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
