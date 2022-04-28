import { DrugResponse } from "../dtos";
import { Drug } from "../models";
import { DrugRepository } from "../repositories";
import { ErrorHandler } from "../shared";

export class DrugService {
  static async findMany(): Promise<DrugResponse[]> {
    try {
      const records: Drug[] = await DrugRepository.findMany();
      const drugResponses: DrugResponse[] = records.map((record: Drug) => {
        return {
          id: record.id,
          description: record.description,
        } as DrugResponse;
      });

      return drugResponses;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
