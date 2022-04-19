import { CreateDrugDto, UpdateDrugDto } from "../dtos";
import { Drug } from "../models";
import { InternalServerError } from "../shared";

export class DrugRepository {
  static async findMany(): Promise<Drug[]> {
    try {
      return await Drug.findAll();
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<Drug> {
    try {
      return await Drug.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateDrugDto): Promise<Drug> {
    try {
      return await Drug.create(dto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(id: string, dto: UpdateDrugDto): Promise<any> {
    try {
      return await Drug.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await Drug.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
