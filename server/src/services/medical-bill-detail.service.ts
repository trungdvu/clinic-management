import {
  CreateMedicalBillDetailDto,
  DrugResponse,
  UpdateMedicalBillDetailDto,
} from "../dtos";
import { MedicalBillDetailRepository } from "../repositories";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
  InternalServerError,
} from "../shared";

export class MedicalBillDetailService {
  static async findMany(medicalBillId: string): Promise<DrugResponse[]> {
    try {
      const medicalBillRecords: DrugResponse[] = await MedicalBillDetailRepository.findMany(
        medicalBillId
      );

      return medicalBillRecords;
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  static async create(dto: CreateMedicalBillDetailDto): Promise<void> {
    try {
      const { drugInformations, medicalBillId } = dto;

      const medicalBillIdValidResult = Checker.isEmptyStringOrUndefined(
        medicalBillId
      );
      if (!medicalBillIdValidResult.succeed) {
        throw new BadRequestError(medicalBillIdValidResult.message as string);
      }

      for (const drugInformation of drugInformations) {
        const { drugId, unitId, usageId, quantity } = drugInformation;
        const collections: CheckerCollections = [
          {
            argument: drugId,
            argumentName: "Drug Id",
          },
          {
            argument: unitId,
            argumentName: "Unit Id",
          },
          {
            argument: usageId,
            argumentName: "Usage Id",
          },
          {
            argument: quantity,
            argumentName: "Quantity",
          },
        ];
        const checkerResult = Checker.isNullOrUndefinedBulk(collections);
        if (!checkerResult.succeed) {
          throw new BadRequestError(checkerResult.message as string);
        }

        const dataWrite = {
          medicalBillId,
          ...drugInformation,
        };

        await MedicalBillDetailRepository.create(dataWrite);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async update(
    id: string,
    dto: UpdateMedicalBillDetailDto
  ): Promise<void> {
    try {
      return await MedicalBillDetailRepository.update(id, dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async delete(id: string): Promise<string> {
    try {
      return await MedicalBillDetailRepository.delete(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
