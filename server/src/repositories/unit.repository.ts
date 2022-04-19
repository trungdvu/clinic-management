import { CreateUnitDto, UpdateUnitDto } from "../dtos";
import { Unit } from "../models";
import { InternalServerError } from "../shared";

export class UnitRepository {
  static async findMany(): Promise<Unit[]> {
    try {
      return await Unit.findAll();
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<Unit> {
    try {
      return await Unit.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateUnitDto): Promise<Unit> {
    try {
      return await Unit.create(dto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(id: string, dto: UpdateUnitDto): Promise<any> {
    try {
      return await Unit.update(dto, {
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
      return await Unit.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
