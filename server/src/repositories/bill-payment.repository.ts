import { CreateBillPaymentDto } from "../dtos";
import { BillPayment } from "../models";
import { InternalServerError } from "../shared";
export class BillPaymentRepository {
  static async create(dto: CreateBillPaymentDto): Promise<BillPayment> {
    try {
      return await BillPayment.create(dto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
