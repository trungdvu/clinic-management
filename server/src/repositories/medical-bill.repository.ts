import moment from "moment";
import { Op } from "sequelize";
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
      const { patientId, page, limit, month } = query;
      const defaultItemPerPage = 10;
      const defaultLimit: number | undefined = limit ? limit : undefined;
      const defaultOffset: number | undefined = page
        ? page * (limit ? limit : defaultItemPerPage)
        : undefined;

      const records = await MedicalBill.findAll({
        include: {
          model: Patient,
          attributes: ["fullName"],
        },
        limit: defaultLimit,
        offset: defaultOffset,
      });

      return records;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<MedicalBill> {
    try {
      const record: MedicalBill = await MedicalBill.findByPk(id);
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateMedicalBillDto): Promise<MedicalBill> {
    try {
      const medicalBillResponse: MedicalBill = await MedicalBill.create(dto);

      return medicalBillResponse;
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

  static async findManyToday(): Promise<MedicalBill[]> {
    try {
      const records = await MedicalBill.findAll({
        where: {
          createdAt: {
            [Op.gte]: moment().startOf("day").toDate(),
          },
        },
        include: {
          model: Patient,
          attributes: ["fullName", "id"],
        },
      });

      return records;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
