import { Op } from "sequelize";
import {
  CreateMedicalBillDto,
  MedicalBillResponse,
  UpdateMedicalBillDto,
} from "../dtos";
import { models } from "../models";
import { FindMedicalBillsQueryParams } from "../dtos";
import { InternalServerError } from "../shared";

const { MedicalBill } = models;

export class MedicalBillRepository {
  static async findMany(
    query: FindMedicalBillsQueryParams
  ): Promise<MedicalBillResponse[]> {
    try {
      const { patientId } = query;
      return await MedicalBill.findAll();
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<typeof MedicalBill> {
    try {
      return await MedicalBill.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateMedicalBillDto): Promise<void> {
    try {
      return await MedicalBill.create(dto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(
    id: string,
    dto: UpdateMedicalBillDto
  ): Promise<typeof MedicalBill> {
    try {
      const medicalBillFounded = await this.findById(id);

      return await medicalBillFounded.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<typeof MedicalBill> {
    try {
      return await MedicalBill.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
