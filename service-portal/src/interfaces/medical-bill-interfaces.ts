export type MedicalBillStatus = 'pending' | 'active' | 'completed';

export interface NewMedicalBillPayload {
  patientId: string;
  systomDescription: string;
  prediction?: string;
  diseaseTypeId?: string;
}

export interface MedicalBillSumary {
  id: string;
  diseaseTypeId: string;
  prediction: string;
  symptomDescription: string;
  status: MedicalBillStatus;
  patientFullName: string;
  createdAt: string;
}
