import { SignUpDto } from "../dtos";
import { Identity, Patient } from "../models";
import { InternalServerError } from "../shared";
import { BillPayment } from "../models/bill-payment.model";

export class IdentityRepository {
  static async findMany(): Promise<Identity[]> {
    try {
      return await Identity.findAll();
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<Identity> {
    try {
      return await Identity.findByPk(id, {
        include: [
          {
            model: Patient,
          },
          {
            model: BillPayment,
          },
        ],
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findByEmail(email: string): Promise<Identity> {
    try {
      return await Identity.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(signUpDto: SignUpDto): Promise<Identity> {
    try {
      return await Identity.create(signUpDto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(id: string, identity: Identity): Promise<any> {
    try {
      return await Identity.update(identity, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
