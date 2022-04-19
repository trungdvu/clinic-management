import { DrugType, Unit } from "../models";
import { InternalServerError } from "../shared";

export class DrugTypeRepository {
  static async findManyByDrugId(drugId: string): Promise<DrugType[]> {
    try {
      return await DrugType.findAll({
        where: {
          drugId,
        },
        include: {
          model: Unit,
          attributes: ["id", "description"],
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
