import { Op } from "sequelize";
import { InternalServerError } from "../shared";
import { models } from "../models";

const { Drug } = models;

export class DrugRepository {
  static async findById(id: string): Promise<typeof Drug> {
    try {
      return await Drug.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
