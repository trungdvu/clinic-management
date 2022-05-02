import _ from "lodash";
import {
  CreateMedicalBillDto,
  DashboardMedicalBillSummaryResponse,
  DiseaseTypeResponse,
  FindMedicalBillsQueryParams,
  MedicalBillDetailResponse,
  MedicalBillResponse,
  MedicalBillSummaryResponse,
  PatientResponse,
  UpdateMedicalBillDto,
  ViewDashboardSummaryTodayResponse,
} from "../dtos";
import { MedicalBill, MedicalBillStatus, sequelize } from "../models";
import { MedicalBillDiseaseType } from "../models/medical-bill-disease-type.model";
import {
  DiseaseTypeRepository,
  MedicalBillDiseaseTypeRepository,
  MedicalBillRepository,
  PatientRepository,
} from "../repositories";
import { IdentityRepository } from "../repositories/identity.repository";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
  NotFoundError,
} from "../shared";
import { MedicalBillDetailService } from "./medical-bill-detail.service";
import { PatientService } from "./patient.service";
import { RedisService } from "./redis.service";
import { TokenService } from "./token.service";

export class MedicalBillService {
  static async findMany(
    query: FindMedicalBillsQueryParams
  ): Promise<MedicalBillSummaryResponse[]> {
    const { userId } = await TokenService.decode(
      TokenService.getCurrentToken()
    );

    try {
      const isExistedKey = await RedisService.has("medical-bills" + userId);
      if (isExistedKey && _.isEmpty(query)) {
        const cachedData = await RedisService.get("medical-bills" + userId);

        return JSON.parse(cachedData) as MedicalBillSummaryResponse[];
      } else {
        const { patientId } = query;
        if (patientId) {
          const isNotExistedPatientId = await this.isNotExistedPatientId(
            patientId
          );
          if (isNotExistedPatientId) {
            throw new BadRequestError("Patient Id Query Param Not existed");
          }
        }

        const medicalBillRecords: MedicalBill[] = await MedicalBillRepository.findMany(
          userId,
          query
        );

        const responses: MedicalBillSummaryResponse[] = [];

        // TODO: Refactor these
        for (const record of medicalBillRecords) {
          const diseaseTypeResponses: DiseaseTypeResponse[] = await this.findDiseaseTypeByMedicalBillId(
            record.id
          );

          const medicalBillResponse: MedicalBillSummaryResponse = {
            id: record.id,
            diseaseTypes: diseaseTypeResponses,
            prediction: record.prediction,
            symptomDescription: record.symptomDescription,
            status: record.status,
            patientFullName: record.patient.fullName,
            createdAt: record.createdAt,
          };

          responses.push(medicalBillResponse);
        }

        await RedisService.set(
          "medical-bills" + userId,
          JSON.stringify(responses)
        );
        return responses;
      }
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async findDiseaseTypeByMedicalBillId(
    medicalBillId: string
  ): Promise<DiseaseTypeResponse[]> {
    const medicalBillDiseaseTypes: MedicalBillDiseaseType[] = await MedicalBillDiseaseTypeRepository.findManyByMedicalBillId(
      medicalBillId
    );

    return medicalBillDiseaseTypes.map(
      (medicalBillDiseaseType: MedicalBillDiseaseType) => {
        return {
          id: medicalBillDiseaseType.diseaseType.id,
          description: medicalBillDiseaseType.diseaseType.description,
        } as DiseaseTypeResponse;
      }
    );
  }

  static async isNotExistedPatientId(patientId: string): Promise<boolean> {
    const patientFounded = await PatientRepository.findById(patientId);
    return patientFounded ? false : true;
  }

  static async findById(id: string): Promise<MedicalBillResponse> {
    try {
      const medicalBill: MedicalBill = await MedicalBillRepository.findById(id);
      const medicalBillDetails: MedicalBillDetailResponse[] = await MedicalBillDetailService.findMany(
        id
      );
      const diseaseTypeResponses: DiseaseTypeResponse[] = await this.findDiseaseTypeByMedicalBillId(
        id
      );
      const patient: PatientResponse = await PatientService.findById(
        medicalBill.patientId
      );

      return {
        id: medicalBill.id,
        diseaseTypes: diseaseTypeResponses,
        prediction: medicalBill.prediction,
        status: medicalBill.status,
        symptomDescription: medicalBill.symptomDescription,
        patient,
        createdAt: medicalBill.createdAt,
        drugDetails: medicalBillDetails,
      } as MedicalBillResponse;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async create(dto: CreateMedicalBillDto): Promise<void> {
    const transaction = await sequelize.transaction();
    // TODO: Refactor this duplicate line
    const { userId } = await TokenService.decode(
      TokenService.getCurrentToken()
    );

    try {
      const {
        diseaseTypeIds,
        symptomDescription,
        prediction,
        patientId,
        creatorId,
      } = dto;

      const collections: CheckerCollections = [
        {
          argument: symptomDescription,
          argumentName: "Symptom Description",
        },
        {
          argument: prediction,
          argumentName: "Prediction",
        },
        {
          argument: patientId,
          argumentName: "Patient Id",
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

      const patientFounded = await PatientService.findById(patientId);
      if (!patientFounded) {
        throw new BadRequestError("Patient Id was not existed!!");
      }

      const creatorFounded = await IdentityRepository.findById(creatorId);
      if (!creatorFounded) {
        throw new BadRequestError("Creator Id was not existed!!");
      }

      const medicalBillResult: MedicalBill = await MedicalBillRepository.create(
        dto
      );

      if (diseaseTypeIds) {
        for (const diseaseTypeId of diseaseTypeIds) {
          const diseaseTypeFounded = await DiseaseTypeRepository.findById(
            diseaseTypeId
          );

          const diseaseTypeExistedResult = Checker.isNullOrUndefined(
            diseaseTypeFounded
          );
          if (!diseaseTypeExistedResult.succeed) {
            throw new BadRequestError(
              `DiseaseType id: ${diseaseTypeId} was not existed`
            );
          }

          await MedicalBillDiseaseTypeRepository.create(
            medicalBillResult.id,
            diseaseTypeId
          );
        }
      }

      await RedisService.remove("medical-bills" + userId);
    } catch (error) {
      if (transaction) {
        transaction.rollback();
      }

      ErrorHandler(error);
    }
  }

  static async update(id: string, dto: UpdateMedicalBillDto): Promise<void> {
    try {
      const isNotExistedMedicalBillId = await this.isNotExistedMedicalBillId(
        id
      );
      if (isNotExistedMedicalBillId) {
        throw new NotFoundError(`Medical bill id: ${id} was not existed`);
      }

      const { diseaseTypeIds } = dto;

      if (diseaseTypeIds) {
        await MedicalBillDiseaseTypeRepository.deleteByMedicalBillId(id);

        for (const diseaseTypeId of diseaseTypeIds) {
          const diseaseTypeIdNotExisted = await this.isDiseaseTypeNotExisted(
            diseaseTypeId
          );
          if (diseaseTypeIdNotExisted) {
            throw new BadRequestError(
              `DiseaseType id: ${diseaseTypeId} was not existed`
            );
          }

          await MedicalBillDiseaseTypeRepository.create(id, diseaseTypeId);
        }
      }

      await MedicalBillRepository.update(id, dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async isNotExistedMedicalBillId(
    medicalBillId: string
  ): Promise<boolean> {
    const medicalBillFounded = await MedicalBillRepository.findById(
      medicalBillId
    );
    return medicalBillFounded ? false : true;
  }

  static async isDiseaseTypeNotExisted(
    diseaseTypeId: string
  ): Promise<boolean> {
    const diseaseTypeFounded = await DiseaseTypeRepository.findById(
      diseaseTypeId
    );
    console.log("diseaseTypeFounded", diseaseTypeFounded);

    return diseaseTypeFounded ? false : true;
  }

  static async delete(id: string): Promise<void> {
    try {
      const isNotExistedMedicalBillId = await this.isNotExistedMedicalBillId(
        id
      );
      if (isNotExistedMedicalBillId) {
        throw new NotFoundError(`Medical bill id: ${id} was not existed`);
      }

      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );
      await MedicalBillRepository.delete(id);
      await RedisService.remove("medical-bills" + userId);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async viewDashboardSummary(): Promise<ViewDashboardSummaryTodayResponse> {
    try {
      const { userId } = await TokenService.decode(
        TokenService.getCurrentToken()
      );

      const medicalBills = await MedicalBillRepository.findManyToday();

      let activeCount = 0;
      let pendingCount = 0;
      let completedCount = 0;
      const myMedicalBills = _.chain(medicalBills)
        .filter((d) => {
          if (d.status === MedicalBillStatus.Active) {
            activeCount++;
          } else if (d.status === MedicalBillStatus.Pending) {
            pendingCount++;
          } else if (d.status === MedicalBillStatus.Completed) {
            completedCount++;
          }

          return d.creatorId === userId;
        })
        .map(
          (d): DashboardMedicalBillSummaryResponse => ({
            id: d.id,
            patientId: d.patient.id,
            symptomDescription: d.symptomDescription,
            patientFullName: d.patient.fullName,
            createdAt: d.createdAt,
          })
        )
        .value();

      const response: ViewDashboardSummaryTodayResponse = {
        activeCount,
        pendingCount,
        completedCount,
        myMedicalBills,
      };

      return response;
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
