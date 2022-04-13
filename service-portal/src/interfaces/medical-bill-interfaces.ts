export interface NewMedicalBillPayload {
  patientId: string;
  systomDescription: string;
  prediction?: string;
  diseaseTypeId?: string;
}

export interface MedicalBill {
  id: string;
  diseaseTypeId: string;
  prediction: string;
  symptomDescription: string;
  patientId: string;
  drugs: any[];
}
