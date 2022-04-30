import { DiseaseType } from "../models";
import { InternalServerError } from "../shared";

export class DiseaseTypeRepository {
  static async findMany(): Promise<DiseaseType[]> {
    try {
      const records: DiseaseType[] = await DiseaseType.findAll();
      return records;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<DiseaseType> {
    try {
      const record = await DiseaseType.findByPk(id);
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
