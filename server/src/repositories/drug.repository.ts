import { CreateDrugDto, UpdateDrugDto } from "../dtos";
import { Drug } from "../models";
import { InternalServerError } from "../shared";

export class DrugRepository {
  static async findMany(): Promise<Drug[]> {
    try {
      const records: Drug[] = await Drug.findAll();
      return records;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<Drug> {
    try {
      const record: Drug = await Drug.findByPk(id);
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateDrugDto): Promise<Drug> {
    try {
      const response: Drug = await Drug.create(dto);
      return response;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(id: string, dto: UpdateDrugDto): Promise<void> {
    try {
      await Drug.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await Drug.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
