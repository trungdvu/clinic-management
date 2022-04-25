import {
  CreateMedicalBillDetailDto,
  MedicalBillDetailResponse,
  UnitResponse,
  UpdateMedicalBillDetailDto,
} from "../dtos";
import { DrugType, MedicalBillDetail } from "../models";
import {
  DrugPriceRepository,
  DrugRepository,
  DrugTypeRepository,
  MedicalBillDetailRepository,
  UnitRepository,
  UsageRepository,
} from "../repositories";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
  InternalServerError,
} from "../shared";

export class MedicalBillDetailService {
  static async findMany(
    medicalBillId: string
  ): Promise<MedicalBillDetailResponse[]> {
    try {
      const medicalBillDetailRecords: MedicalBillDetail[] = await MedicalBillDetailRepository.findManyByMedicalBillId(
        medicalBillId
      );
      const medicalBillDetailResponses: MedicalBillDetailResponse[] = [];

      for (const record of medicalBillDetailRecords) {
        const availableUnits: UnitResponse[] = await this.findAvailableUnits(
          record.drugId
        );

        const price: number = await DrugPriceRepository.findPrice(
          record.drugId,
          record.unitId
        );
        const drugFounded = await DrugRepository.findById(record.drugId);
        const usageFounded = await UsageRepository.findById(record.usageId);
        const unitFounded = await UnitRepository.findById(record.unitId);

        const totalPrice = record.quantity * price;

        const medicalBillResponse: MedicalBillDetailResponse = {
          id: record.id,
          drug: {
            id: drugFounded.id,
            description: drugFounded.description,
          },
          unit: {
            id: unitFounded.id,
            description: unitFounded.description,
          },
          availableUnits: availableUnits,
          usage: {
            id: usageFounded.id,
            description: usageFounded.description,
          },
          quantity: record.quantity,
          price: totalPrice,
        };

        medicalBillDetailResponses.push(medicalBillResponse);
      }

      return medicalBillDetailResponses;
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  static async findAvailableUnits(drugId: string): Promise<UnitResponse[]> {
    const drugTypes: DrugType[] = await DrugTypeRepository.findManyByDrugId(
      drugId
    );

    return drugTypes.map((drugType: DrugType) => {
      return {
        id: drugType.unitId,
        description: drugType.unit.description,
      } as UnitResponse;
    });
  }

  static async create(dto: CreateMedicalBillDetailDto): Promise<void> {
    try {
      const { drugInformation, medicalBillId } = dto;

      const medicalBillIdValidResult = Checker.isEmptyStringOrUndefined(
        medicalBillId
      );
      if (!medicalBillIdValidResult.succeed) {
        throw new BadRequestError(medicalBillIdValidResult.message as string);
      }

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

      const isNotExistedDrugId = await this.isNotExistedDrugId(drugId);
      if (isNotExistedDrugId) {
        throw new BadRequestError("Drug Id was not existed!!!");
      }

      const isNotExistedUnitId = await this.isNotExistedUnitId(unitId);
      if (isNotExistedUnitId) {
        throw new BadRequestError("Unit Id was not existed!!!");
      }

      const isNotExistedUsageId = await this.isNotExistedUsageId(usageId);
      if (isNotExistedUsageId) {
        throw new BadRequestError("Usage Id was not existed!!!");
      }

      await MedicalBillDetailRepository.create(dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async isNotExistedDrugId(drugId: string): Promise<boolean> {
    const drugFounded = await DrugRepository.findById(drugId);
    return drugFounded ? false : true;
  }

  static async isNotExistedUnitId(unitId: string): Promise<boolean> {
    const unitFounded = await UnitRepository.findById(unitId);
    return unitFounded ? false : true;
  }

  static async isNotExistedUsageId(usageId: string): Promise<boolean> {
    const usageFounded = await UsageRepository.findById(usageId);
    return usageFounded ? false : true;
  }

  static async update(
    id: string,
    dto: UpdateMedicalBillDetailDto
  ): Promise<any> {
    try {
      return await MedicalBillDetailRepository.update(id, dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await MedicalBillDetailRepository.delete(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
