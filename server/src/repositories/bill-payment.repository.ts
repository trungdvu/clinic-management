import { CreateBillPaymentDto } from "../dtos";
import { BillPayment } from "../models";
import { InternalServerError } from "../shared";

export class BillPaymentRepository {
  static async create(dto: CreateBillPaymentDto): Promise<BillPayment> {
    try {
      console.log("Hello from repository");

      const recordInput = {
        ...dto,
      };
      return await BillPayment.create(recordInput);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
