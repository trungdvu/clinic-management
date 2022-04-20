import {
  CreateMedicalBillDto,
  DiseaseTypeResponse,
  FindMedicalBillsQueryParams,
  MedicalBillDetailResponse,
  MedicalBillResponse,
  MedicalBillSummaryResponse,
  PatientResponse,
  UpdateMedicalBillDto,
} from "../dtos";
import { MedicalBill } from "../models";
import { MedicalBillDiseaseType } from "../models/medical-bill-disease-type.model";
import {
  DiseaseTypeRepository,
  MedicalBillDiseaseTypeRepository,
  MedicalBillRepository,
  PatientRepository,
} from "../repositories";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
} from "../shared";
import { MedicalBillDetailService } from "./medical-bill-detail.service";
import { PatientService } from "./patient.service";
export class MedicalBillService {
  static async findMany(
    query: FindMedicalBillsQueryParams
  ): Promise<MedicalBillSummaryResponse[]> {
    try {
      const medicalBillRecords: MedicalBill[] = await MedicalBillRepository.findMany(
        query
      );

      const responses: MedicalBillSummaryResponse[] = [];

      // TODO: Refactor these
      for (const record of medicalBillRecords) {
        // const mappingDiseaseTypes: DiseaseTypeResponse[] = record.diseaseTypes.map(
        //   (diseaseType: DiseaseTypeResponse) => {
        //     return {
        //       id: diseaseType.id,
        //       description: diseaseType.description,
        //     } as DiseaseTypeResponse;
        //   }
        // );

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

      return responses;
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
    try {
      const { diseaseTypeIds, symptomDescription, prediction, patientId } = dto;

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
      ];
      const checkerResult = Checker.isNullOrUndefinedBulk(collections);
      if (!checkerResult.succeed) {
        throw new BadRequestError(checkerResult.message as string);
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
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async update(id: string, dto: UpdateMedicalBillDto): Promise<string> {
    try {
      return await MedicalBillRepository.update(id, dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await MedicalBillRepository.delete(id);
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
