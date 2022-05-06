import { DiseaseTypeResponse } from "../dtos";
import { DiseaseTypeRepository } from "../repositories";
import { ErrorHandler } from "../shared";
import { RedisService } from "./redis.service";
import { TokenService } from "./token.service";

export class DiseaseTypeService {
  static async findMany(): Promise<DiseaseTypeResponse[]> {
    try {
      const diseaseTypeRecords = await DiseaseTypeRepository.findMany();
      const response = diseaseTypeRecords.map<DiseaseTypeResponse>(
        (record) => ({ id: record.id, description: record.description })
      );

      return response;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
