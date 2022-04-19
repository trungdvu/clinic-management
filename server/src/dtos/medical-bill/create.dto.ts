export interface CreateMedicalBillDto {
  diseaseTypeIds?: string[];
  symptomDescription: string;
  prediction: string;
  patientId: string;
}
