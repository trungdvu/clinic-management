export interface CreateMedicalBillDto {
  diseaseTypeId?: string;
  symptomDescription: string;
  prediction: string;
  patientId: string;
}
