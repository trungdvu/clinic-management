import { Transaction } from "sequelize";
import {
  UpdateMedicalBillDetailDto,
  CreateMedicalBillDetailDto,
} from "../dtos";
import { MedicalBillDetail } from "../models";
import { InternalServerError } from "../shared";

export class MedicalBillDetailRepository {
  static async findManyByMedicalBillId(
    medicalBillId: string
  ): Promise<MedicalBillDetail[]> {
    try {
      return await MedicalBillDetail.findAll({
        where: {
          medicalBillId,
        },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<MedicalBillDetail> {
    try {
      return await MedicalBillDetail.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  static async create(
    dto: CreateMedicalBillDetailDto,
    transaction?: Transaction
  ): Promise<MedicalBillDetail> {
    try {
      const { medicalBillId, drugInformation } = dto;
      const input = {
        medicalBillId,
        ...drugInformation,
      };

      return await MedicalBillDetail.create(input, {
        transaction,
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(
    id: string,
    dto: UpdateMedicalBillDetailDto
  ): Promise<any> {
    try {
      await MedicalBillDetail.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await MedicalBillDetail.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
