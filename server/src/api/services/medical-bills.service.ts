import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
  InternalServerError,
} from "../../shared";
import {
  CreateMedicalBillDto,
  FindMedicalBillsQueryParams,
  MedicalBillResponse,
  UpdateMedicalBillDto,
} from "../dtos";
import { MedicalBillRepository } from "../repositories";

export class MedicalBillService {
  static async findMany(
    query: FindMedicalBillsQueryParams
  ): Promise<MedicalBillResponse[]> {
    try {
      return await MedicalBillRepository.findMany(query);
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  static async findById(id: string): Promise<MedicalBillResponse> {
    try {
      return await MedicalBillRepository.findById(id);
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
          argumentName: "Patient",
        },
      ];

      const checkerResult = Checker.isNullOrUndefinedBulk(collections);
      if (!checkerResult.succeed) {
        return new BadRequestError(checkerResult.message as string);
      }

      const defaultProps: CreateMedicalBillDto = {
        ...dto,
      };

      return await MedicalBillRepository.create(defaultProps);
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

  static async delete(id: string): Promise<string> {
    try {
      return await MedicalBillRepository.delete(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
