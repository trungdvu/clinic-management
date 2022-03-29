import {
  BadRequestError,
  Checker,
  CheckerCollection,
  CheckerCollections,
  InternalServerError,
} from "../../shared";
import {
  CreatePatientDto,
  FindAllPatientsQuery,
  PatientResponse,
  UpdatePatientDto,
} from "../dtos";
import { PatientRepository } from "../repositories";

export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async findMany(query: FindAllPatientsQuery): Promise<PatientResponse[]> {
    try {
      const { text } = query;
      if (text) {
        return await this.patientRepository.findManyByName(text);
      }

      return await this.patientRepository.findMany();
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  async create(dto: CreatePatientDto): Promise<any> {
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

      return await this.patientRepository.create(defaultProps);
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  async update(id: string, dto: UpdatePatientDto): Promise<any> {
    try {
      return await this.patientRepository.update(id, dto);
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return await this.patientRepository.delete(id);
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }
}
