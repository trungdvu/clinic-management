import { DiseaseTypeResponse } from "../disease-type";

export interface BillPaymentSummaryResponse {
  id: string;
  medicalBillId: string;
  patientId: string;
  medicalCost: string;
  totalDrugCost: string;
  createdAt: string;
}
