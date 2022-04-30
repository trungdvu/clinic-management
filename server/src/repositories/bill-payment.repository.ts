import { CreateBillPaymentDto } from "../dtos";
import { FindBillPaymentsQueryParams } from "../dtos/bill-payment/find-bill-payment.query";
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
  static async findMany(
    userId: string,
    query: FindBillPaymentsQueryParams
  ): Promise<BillPayment[]> {
    try {
      const { patientId, medicalBillId, page, limit } = query;

      const defaultItemPerPage = 10;
      const defaultLimit: number | undefined = limit ? limit : undefined;
      const defaultOffset: number | undefined = page
        ? page * (limit ? limit : defaultItemPerPage)
        : undefined;

      if(patientId && medicalBillId){
        return await BillPayment.findAll({
          where: {
            patientId: patientId,
            medicalBillId: medicalBillId,
          },
          limit: defaultLimit,
          offset: defaultOffset,
        });
      }
      else if(patientId){
        return await BillPayment.findAll({
          where: {
            patientId: patientId
          },
          limit: defaultLimit,
          offset: defaultOffset,
        });
      }
      else if(medicalBillId){
        return await BillPayment.findAll({
          where: {
            medicalBillId: medicalBillId
          },
          limit: defaultLimit,
          offset: defaultOffset,
        });
      }
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
