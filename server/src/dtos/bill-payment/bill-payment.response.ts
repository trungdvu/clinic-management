import { MedicalBillDetailResponse } from "../medical-bill-detail";
import { PatientResponse } from "../patient";

export interface BillPaymentResponse {
  id: string;
  patient: PatientResponse;
  medicalExamCost: number;
  drugDetails: MedicalBillDetailResponse[];
  status: string;
  totalDrugCost: number;
  createdAt: string;
  createdBy: string;
  barCode?: string;
  qrCode?: string;
}
