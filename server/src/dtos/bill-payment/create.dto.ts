export interface CreateBillPaymentDto {
  medicalBillId: string;
  patientId: string;
  medicalExamCost?: number;
  totalDrugCost?: number;
}
