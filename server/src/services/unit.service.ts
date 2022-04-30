import { UnitPriceInputByDrugResponse, UnitResponse } from "../dtos";
import { DrugType, Unit } from "../models";
import { DrugPriceRepository, DrugTypeRepository } from "../repositories";
import { ErrorHandler } from "../shared";
import { MedicalBillDetailService } from "./medical-bill-detail.service";

export class UnitService {
  static async findManyByDrugId(
    drugId: string
  ): Promise<UnitPriceInputByDrugResponse[]> {
    try {
      const unitResponses: UnitResponse[] = await this.findAvailableUnitResponses(
        drugId
      );

      const unitPriceResponses: UnitPriceInputByDrugResponse[] = [];

      for (const unitResponse of unitResponses) {
        const price: number = await DrugPriceRepository.findPrice(
          drugId,
          unitResponse.id
        );
        const response: UnitPriceInputByDrugResponse = {
          unit: unitResponse,
          price: price,
        };

        unitPriceResponses.push(response);
      }

      return unitPriceResponses;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async findAvailableUnitResponses(
    drugId: string
  ): Promise<UnitResponse[]> {
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
}
