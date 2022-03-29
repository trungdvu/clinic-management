import { Op } from "sequelize";
import {
  CreatePatientDto,
  FindAllPatientsQuery,
  SignUpDto,
  UpdatePatientDto,
} from "../dtos";
import { models } from "../models";

const { Patient } = models;

export class PatientRepository {
  async findManyByName(name: string): Promise<typeof Patient[]> {
    return await Patient.findAll({
      where: {
        fullName: { [Op.like]: `%${name}%` },
      },
    });
  }

  async findMany(): Promise<typeof Patient[]> {
    return await Patient.findAll();
  }

  async findById(id: string): Promise<typeof Patient> {
    return await Patient.findByPk(id);
  }

  async create(dto: CreatePatientDto): Promise<void> {
    try {
      return await Patient.create(dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, dto: UpdatePatientDto): Promise<typeof Patient> {
    try {
      const userFound = await this.findById(id);

      return await userFound.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<typeof Patient> {
    try {
      return await Patient.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
