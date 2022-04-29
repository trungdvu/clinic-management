import { MedicalBillStatus } from "../../models";

export interface UpdateMedicalBillDto {
  diseaseTypeIds?: string[];
  symptomDescription?: string;
  prediction?: string;
  status?: MedicalBillStatus;
}
