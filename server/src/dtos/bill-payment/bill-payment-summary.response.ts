import { PatientResponse } from "../patient";

export interface BillPaymentSummaryResponse {
  id: string;
  patient: PatientResponse;
  medicalExamCost: number;
  totalDrugCost: number;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  barCode?: string;
  qrCode?: string;
}