import { MedicalBillDetailResponse } from "../medical-bill-detail";
import { PatientResponse } from "../patient";

export interface BillPaymentResponse {
  id: string;
  patient: PatientResponse;
  medicalExamCost: number;
  drugDetails: MedicalBillDetailResponse[];
  totalDrugCost: number;
  barCode?: string;
  qrCode?: string;
}
