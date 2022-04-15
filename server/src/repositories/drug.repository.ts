import { Op } from "sequelize";
import { InternalServerError } from "../shared";
import { Drug } from "../models";

export class DrugRepository {
  static async findById(id: string): Promise<Drug> {
    try {
      return await Drug.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
