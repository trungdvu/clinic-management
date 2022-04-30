import { DiseaseTypeResponse } from "../dtos";
import { DiseaseTypeRepository } from "../repositories";
import { ErrorHandler } from "../shared";
import { RedisService } from "./redis.service";
import { TokenService } from "./token.service";

export class DiseaseTypeService {
  static async findMany(): Promise<DiseaseTypeResponse[]> {
    try {
      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );
      const redisKey = `disease-type-find-many-${userId}`;
      const isExistedKey = await RedisService.has(redisKey);

      if (isExistedKey) {
        const cachedData = await RedisService.get(redisKey);
        return JSON.parse(cachedData) as DiseaseTypeResponse[];
      }

      const diseaseTypeRecords = await DiseaseTypeRepository.findMany();
      const response = diseaseTypeRecords.map<DiseaseTypeResponse>(
        (record) => ({ id: record.id, description: record.description })
      );

      await RedisService.set(redisKey, JSON.stringify(response));

      return response;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
