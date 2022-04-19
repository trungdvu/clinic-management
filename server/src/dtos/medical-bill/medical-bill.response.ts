import { DiseaseTypeResponse } from "../disease-type";
import { MedicalBillDetailResponse } from "../medical-bill-detail";
import { PatientResponse } from "../patient";

export interface MedicalBillResponse {
  id: string;
  diseaseTypes: DiseaseTypeResponse[];
  prediction: string;
  status: string;
  symptomDescription: string;
  patient: PatientResponse;
  drugDetails: MedicalBillDetailResponse[];
  createdAt: string;
}
