import { CreateBillPaymentDto } from "../dtos";
import { MedicalBill, Patient } from "../models";
import {
  BillPaymentRepository,
  MedicalBillRepository,
  PatientRepository,
} from "../repositories";
import {
  BadRequestError,
  Checker,
  CheckerCollections,
  ErrorHandler,
} from "../shared";

export class BillPaymentService {
  static async create(dto: CreateBillPaymentDto): Promise<void> {
    try {
      const { medicalBillId, patientId } = dto;

      const collections: CheckerCollections = [
        {
          argument: medicalBillId,
          argumentName: "Medical Bill Id",
        },
        {
          argument: patientId,
          argumentName: "Patient Id",
        },
      ];
      const checkerResult = Checker.isNullOrUndefinedBulk(collections);
      if (!checkerResult.succeed) {
        throw new BadRequestError(checkerResult.message);
      }

      const isMedicalBillIdNotExisted = await this.isMedicalBillIdNotExisted(
        medicalBillId
      );
      if (isMedicalBillIdNotExisted) {
        throw new BadRequestError(
          `Medical Bill Id: ${medicalBillId} was not existed!!!`
        );
      }

      const isPatientIdNotExisted = await this.isPatientIdNotExisted(patientId);
      if (isPatientIdNotExisted) {
        throw new BadRequestError(
          `Patient Id: ${patientId} was not existed!!!`
        );
      }

      await BillPaymentRepository.create(dto);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async isMedicalBillIdNotExisted(
    medicalBillId: string
  ): Promise<boolean> {
    const medicalBillFounded: MedicalBill = await MedicalBillRepository.findById(
      medicalBillId
    );
    return medicalBillFounded ? false : true;
  }

  static async isPatientIdNotExisted(patientId: string): Promise<boolean> {
    const patientFounded: Patient = await PatientRepository.findById(patientId);
    return patientFounded ? false : true;
  }
}
