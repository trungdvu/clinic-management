import { MedicalBillDiseaseType } from "../models";
import { InternalServerError } from "../shared";
import { DiseaseType } from "../models/disease-type.model";
import { Transaction } from "sequelize";

export class MedicalBillDiseaseTypeRepository {
  static async findManyByMedicalBillId(
    medicalBillId: string
  ): Promise<MedicalBillDiseaseType[]> {
    try {
      const records: MedicalBillDiseaseType[] = await MedicalBillDiseaseType.findAll(
        {
          where: {
            medicalBillId,
          },
          include: {
            model: DiseaseType,
            attributes: ["id", "description"],
          },
        }
      );
      return records;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findOne(
    medicalBillId: string,
    diseaseTypeId: string
  ): Promise<MedicalBillDiseaseType> {
    try {
      const record: MedicalBillDiseaseType = await MedicalBillDiseaseType.findOne(
        {
          where: {
            medicalBillId,
            diseaseTypeId,
          },
        }
      );
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<MedicalBillDiseaseType> {
    try {
      return await MedicalBillDiseaseType.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(
    medicalBillId: string,
    diseaseTypeId: string
  ): Promise<MedicalBillDiseaseType> {
    try {
      const input = {
        medicalBillId,
        diseaseTypeId,
      };

      const response: MedicalBillDiseaseType = await MedicalBillDiseaseType.create(
        input
      );
      return response;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(id: string, diseaseTypeId: string): Promise<void> {
    try {
      await MedicalBillDiseaseType.update(
        {
          diseaseTypeId,
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

  static async deleteByMedicalBillId(medicalBillId: string): Promise<boolean> {
    try {
      const result: number = await MedicalBillDiseaseType.destroy({
        where: {
          medicalBillId,
        },
      });

      return result > 0;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
