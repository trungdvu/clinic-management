import { Op } from "sequelize";
import {
  DrugResponse,
  DrugInformation,
  UpdateMedicalBillDetailDto,
} from "../dtos";
import { models } from "../models";
import { InternalServerError } from "../shared";

const { MedicalBillDetail } = models;

export class MedicalBillDetailRepository {
  static async findMany(medicalBillId: string): Promise<DrugResponse[]> {
    try {
      return await MedicalBillDetail.findAll({
        where: {
          medicalBillId,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<typeof MedicalBillDetail> {
    try {
      return await MedicalBillDetail.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  static async create(dto: DrugInformation): Promise<void> {
    try {
      return await MedicalBillDetail.create(dto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(
    id: string,
    dto: UpdateMedicalBillDetailDto
  ): Promise<typeof MedicalBillDetail> {
    try {
      const medicalBillDetailFounded = await this.findById(id);

      await medicalBillDetailFounded.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<typeof MedicalBillDetail> {
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
