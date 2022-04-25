import { Transaction } from "sequelize";
import {
  CreateMedicalBillDto,
  FindMedicalBillsQueryParams,
  UpdateMedicalBillDto,
} from "../dtos";
import { MedicalBill } from "../models";
import { Patient } from "../models/patient.model";
import { InternalServerError } from "../shared";

export interface CreateMedicalBillRecord {
  id?: string;
  diseaseTypeId: string;
  symptomDescription: string;
  patientId: string;
  prediction: string;
}
export class MedicalBillRepository {
  static async findMany(
    userId: string,
    query: FindMedicalBillsQueryParams
  ): Promise<MedicalBill[]> {
    try {
      const { patientId, page, limit } = query;

      const defaultItemPerPage = 10;
      const defaultLimit: number | undefined = limit ? limit : undefined;
      const defaultOffset: number | undefined = page
        ? page * (limit ? limit : defaultItemPerPage)
        : undefined;

      return await MedicalBill.findAll({
        where: {
          creatorId: userId,
          patientId: patientId ?? undefined,
        },
        include: {
          model: Patient,
          attributes: ["fullName"],
        },
        limit: defaultLimit,
        offset: defaultOffset,
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<MedicalBill> {
    try {
      return await MedicalBill.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateMedicalBillDto): Promise<MedicalBill> {
    try {
      return await MedicalBill.create(dto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(id: string, dto: UpdateMedicalBillDto): Promise<any> {
    try {
      return await MedicalBill.update(dto, {
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
