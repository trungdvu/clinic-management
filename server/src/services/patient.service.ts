import {
  CreatePatientDto,
  FindPatientsQuery,
  PatientResponse,
  UpdatePatientDto,
} from "../dtos";
import { Identity, Patient } from "../models";
import { IdentityRepository, PatientRepository } from "../repositories";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
} from "../shared";

export class PatientService {
  static async findMany(query: FindPatientsQuery): Promise<PatientResponse[]> {
    try {
      const records: Patient[] = await PatientRepository.findMany(query);

      return records.map((record: Patient) => {
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
      ErrorHandler(error);
    }
  }

  static async findById(id: string): Promise<PatientResponse> {
    try {
      const record: Patient = await PatientRepository.findById(id);

      return {
        id: record.id,
        fullName: record.fullName,
        gender: record.gender,
        dayOfBirth: record.dayOfBirth,
        address: record.address,
        phoneNumber: record.phoneNumber,
      } as PatientResponse;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async create(dto: CreatePatientDto): Promise<void> {
    try {
      const {
        fullName,
        phoneNumber,
        gender,
        dayOfBirth,
        address,
        creatorId,
      } = dto;
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
        {
          argument: creatorId,
          argumentName: "Creator Id",
        },
      ];
      const checkerResult = Checker.isNullOrUndefinedBulk(collections);
      if (!checkerResult.succeed) {
        throw new BadRequestError(checkerResult.message as string);
      }

      const isCreatorIdNotExisted = await this.isCreatorIdNotExisted(creatorId);
      if (isCreatorIdNotExisted) {
        throw new BadRequestError("Creator Id was not existed!!!");
      }

      const defaultProps: CreatePatientDto = {
        ...dto,
        address: address ?? "",
      };

      await PatientRepository.create(defaultProps);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async isCreatorIdNotExisted(creatorId: string): Promise<boolean> {
    const creatorFounded = await IdentityRepository.findById(creatorId);
    return creatorFounded ? false : true;
  }

  static async update(id: string, dto: UpdatePatientDto): Promise<string> {
    try {
      return await PatientRepository.update(id, dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await PatientRepository.delete(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
