import { Op } from "sequelize";
import { InternalServerError } from "../shared";
import { Unit } from "../models";

export class UnitRepository {
  static async findById(id: string): Promise<Unit> {
    try {
      return await Unit.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
