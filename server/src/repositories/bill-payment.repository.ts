import { CreateBillPaymentDto } from "../dtos";
import { BillPayment } from "../models";
import { InternalServerError } from "../shared";
export class BillPaymentRepository {
  static async create(dto: CreateBillPaymentDto): Promise<BillPayment> {
    try {
      const record: BillPayment = await BillPayment.create(dto);
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
