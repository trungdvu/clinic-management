import { DiseaseType } from "../models";
import { InternalServerError } from "../shared";

export class DiseaseTypeRepository {
  static async findMany(): Promise<DiseaseType[]> {
    try {
      return await DiseaseType.findAll();
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<DiseaseType> {
    try {
      return await DiseaseType.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
