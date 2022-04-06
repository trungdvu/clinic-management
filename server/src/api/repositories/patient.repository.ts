import { Op } from "sequelize";
import { InternalServerError } from "../../shared";
import { CreatePatientDto, FindPatientsQuery, UpdatePatientDto } from "../dtos";
import { models } from "../models";

const { Patient } = models;

export class PatientRepository {
  static async findManyByName(name: string): Promise<typeof Patient[]> {
    try {
      return await Patient.findAll({
        where: {
          fullName: { [Op.like]: `%${name}%` },
        },
      });
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  static async findMany(query: FindPatientsQuery): Promise<typeof Patient[]> {
    try {
      const { text } = query;
      return await Patient.findAll({
        where: {
          fullName: { [Op.like]: `%${text}%` },
        },
      });
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  static async findById(id: string): Promise<typeof Patient> {
    try {
      return await Patient.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  static async create(dto: CreatePatientDto): Promise<void> {
    try {
      return await Patient.create(dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(
    id: string,
    dto: UpdatePatientDto
  ): Promise<typeof Patient> {
    try {
      const userFound = await this.findById(id);

      return await userFound.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  static async delete(id: string): Promise<typeof Patient> {
    try {
      return await Patient.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error);
    }
  }
}
