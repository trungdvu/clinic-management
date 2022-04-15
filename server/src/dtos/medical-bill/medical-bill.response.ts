import { DrugResponse } from "./drug.response";

export interface MedicalBillResponse {
  id: string;
  diseaseTypeId: string;
  prediction: string;
  status: string;
  symptomDescription: string;
  patientId: string;
  drugs: DrugResponse[];
}
