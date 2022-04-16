import {
  CreatePatientDto,
  FindPatientsQuery,
  PatientResponse,
  UpdatePatientDto,
} from "../dtos";
import { Patient } from "../models";
import { PatientRepository } from "../repositories";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
  InternalServerError,
} from "../shared";

export class PatientService {
  static async findMany(query: FindPatientsQuery): Promise<PatientResponse[]> {
    try {
      const records: Patient[] = await PatientRepository.findMany(query);
      return records.map((record: PatientResponse) => {
        return {
          id: record.id,
          fullName: record.fullName,
          gender: record.gender,
          dayOfBirth: record.dayOfBirth,
          address: record.address,
          phoneNumber: record.phoneNumber,
          createdAt: record.createdAt,
        } as PatientResponse;
      });
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  static async findById(id: string): Promise<PatientResponse> {
    try {
      const record = await PatientRepository.findById(id);
      const patientResponse: PatientResponse = {
        id: record.id,
        fullName: record.fullName,
        address: record.address,
        dayOfBirth: record.dayOfBirth,
        gender: record.gender,
        phoneNumber: record.phoneNumber,
        createdAt: record.createdAt,
      };

      return patientResponse;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async create(dto: CreatePatientDto): Promise<any> {
    try {
      const { fullName, phoneNumber, gender, dayOfBirth, address } = dto;
      const collections: CheckerCollections = [
        {
          argument: fullName,
          argumentName: "Full Name",
        },
        {
          argument: gender,
          argumentName: "Gender",
        },
        {
          argument: phoneNumber,
          argumentName: "Phone Number",
        },
        {
          argument: dayOfBirth,
          argumentName: "Day of birth",
        },
      ];

      const checkerResult = Checker.isNullOrUndefinedBulk(collections);
      if (!checkerResult.succeed) {
        return new BadRequestError(checkerResult.message as string);
      }

      const defaultProps: CreatePatientDto = {
        ...dto,
        address: address ?? "",
      };

      return await PatientRepository.create(defaultProps);
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  static async update(id: string, dto: UpdatePatientDto): Promise<string> {
    try {
      return await PatientRepository.update(id, dto);
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await PatientRepository.delete(id);
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }
}
