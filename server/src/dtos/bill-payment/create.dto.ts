export interface CreateBillPaymentDto {
  medicalBillId: string;
  patientId: string;
  createdBy?: string;
  medicalExamCost?: number;
  totalDrugCost?: number;
}
