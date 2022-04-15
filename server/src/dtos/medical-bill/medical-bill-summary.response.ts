export interface MedicalBillSummaryResponse {
  id: string;
  diseaseTypeId: string;
  prediction: string;
  symptomDescription: string;
  status: string;
  patientFullName: string;
  createdAt: string;
}
