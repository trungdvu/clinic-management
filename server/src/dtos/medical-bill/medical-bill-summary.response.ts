import { DiseaseTypeResponse } from "../disease-type";

export interface MedicalBillSummaryResponse {
  id: string;
  diseaseTypes: DiseaseTypeResponse[];
  prediction: string;
  symptomDescription: string;
  status: string;
  patientFullName: string;
  createdAt: string;
}
