import { MedicalBillDiseaseType } from "../models";
import { InternalServerError } from "../shared";
import { DiseaseType } from "../models/disease-type.model";
import { Transaction } from "sequelize";

export class MedicalBillDiseaseTypeRepository {
  static async findManyByMedicalBillId(
    medicalBillId: string
  ): Promise<MedicalBillDiseaseType[]> {
    try {
      return await MedicalBillDiseaseType.findAll({
        where: {
          medicalBillId,
        },
        include: {
          model: DiseaseType,
          attributes: ["id", "description"],
        },
      });
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
  ): Promise<void> {
    try {
      const input = {
        medicalBillId,
        diseaseTypeId,
      };

      await MedicalBillDiseaseType.create(input);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await MedicalBillDiseaseType.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
