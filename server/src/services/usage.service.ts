import { UsageResponse } from "../dtos";
import { Usage } from "../models";
import { UsageRepository } from "../repositories";
import { ErrorHandler } from "../shared";

export class UsageService {
  static async findMany(): Promise<UsageResponse[]> {
    try {
      const records = await UsageRepository.findMany();
      const usageResponses: UsageResponse[] = records.map((record: Usage) => ({
        id: record.id,
        description: record.description,
      }));

      return usageResponses;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
