import { Op } from "sequelize";
import { InternalServerError } from "../shared";
import { models } from "../models";

const { Unit } = models;

export class UnitRepository {
  static async findById(id: string): Promise<typeof Unit> {
    try {
      return await Unit.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
