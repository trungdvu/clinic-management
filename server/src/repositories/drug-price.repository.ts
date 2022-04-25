import { DrugPrice } from "../models";
import { InternalServerError } from "../shared";

export class DrugPriceRepository {
  static async findPrice(drugId: string, unitId: string): Promise<number> {
    try {
      const record: DrugPrice = await DrugPrice.findOne({
        where: {
          drugId,
          unitId,
        },
      });

      return record.price;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
