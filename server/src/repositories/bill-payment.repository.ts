import { CreateBillPaymentDto, FindBillPaymentsQueryParams } from "../dtos";
import { BillPayment, BillPaymentStatus, Patient } from "../models";
import { InternalServerError } from "../shared";
export class BillPaymentRepository {
  static async findMany(): Promise<BillPayment[]> {
    try {
      const records: BillPayment[] = await BillPayment.findAll();
      return records;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<BillPayment> {
    try {
      const record: BillPayment = await BillPayment.findByPk(id, {
        include: {
          model: Patient,
        },
      });
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateBillPaymentDto): Promise<BillPayment> {
    try {
      const record: BillPayment = await BillPayment.create(dto);
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async updateStatus(
    id: string,
    status: BillPaymentStatus
  ): Promise<void> {
    try {
      await BillPayment.update(
        {
          status,
        },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const result: number = await BillPayment.destroy({
        where: {
          id,
        },
      });

      return result > 1 ? true : false;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
