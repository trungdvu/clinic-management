import {
  BadRequestError,
  Checker,
  CheckerCollection,
  CheckerCollections,
  InternalServerError,
} from "../shared";
import {
  CreatePatientDto,
  FindPatientsQuery,
  PatientResponse,
  UpdatePatientDto,
} from "../dtos";
import { PatientRepository } from "../repositories";

export class PatientService {
  static async findMany(query: FindPatientsQuery): Promise<PatientResponse[]> {
    try {
      return await PatientRepository.findMany(query);
    } catch (error) {
      throw new InternalServerError(error.message as string);
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

  static async delete(id: string): Promise<string> {
    try {
      return await PatientRepository.delete(id);
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }
}
