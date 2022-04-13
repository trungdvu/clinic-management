import { DrugResponse } from "./drug.response";

export interface MedicalBillResponse {
  id: string;
  diseaseTypeId: string;
  prediction: string;
  symptomDescription: string;
  patientId: string;
  drugs: DrugResponse[];
}
