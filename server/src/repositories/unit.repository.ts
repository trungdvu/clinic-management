import { Unit } from "../models";
import { InternalServerError } from "../shared";

export class UnitRepository {
  static async findById(id: string): Promise<Unit> {
    try {
      return await Unit.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
