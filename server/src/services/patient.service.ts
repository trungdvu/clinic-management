import {
  CreatePatientDto,
  FindPatientsQuery,
  PatientResponse,
  UpdatePatientDto,
} from "../dtos";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
} from "../shared";
import { IdentityRepository, PatientRepository } from "../repositories";
import { Patient } from "../models";
import { RedisService } from "./redis.service";
import { TokenService } from "./token.service";
import _ from "lodash";

export class PatientService {
  static async findMany(query: FindPatientsQuery): Promise<PatientResponse[]> {
    try {
      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );

      const isExistedKey = await RedisService.has("patients" + userId);
      if (isExistedKey && _.isEmpty(query)) {
        const cachedData = await RedisService.get("patients" + userId);

        return JSON.parse(cachedData) as PatientResponse[];
      } else {
        const records: Patient[] = await PatientRepository.findMany(
          userId,
          query
        );

        const responses: PatientResponse[] = records.map((record: Patient) => {
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

        await RedisService.set("patients" + userId, JSON.stringify(responses));
        const defaultResponse = responses ?? [];
        return defaultResponse;
      }
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
      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );
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
          argumentName: "Day of Birth",
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
      await RedisService.remove("patients" + userId);
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

  static async delete(id: string): Promise<void> {
    try {
      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );
      await PatientRepository.delete(id);
      await RedisService.remove("patients" + userId);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
