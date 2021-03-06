import { DiseaseType } from './disease-interfaces';
import { Drug } from './drug-interfaces';
import { Patient } from './patient-interfaces';
import { Unit } from './unit-interfaces';
import { Usage } from './usage-interfaces';

export type MedicalBillStatus = 'pending' | 'active' | 'completed';

export interface NewMedicalBillPayload {
  patientId: string;
  systomDescription: string;
  prediction?: string;
  diseaseTypeId?: string;
  creatorId?: string;
}

export interface UpdateMedicalBillPayload {
  id: string;
  body: {
    diseaseTypeIds?: string[];
    symptomDescription?: string;
    prediction?: string;
    status?: MedicalBillStatus;
  };
}

export interface GetMoreMedicalBillSummariesPayload {
  page?: number;
  limit?: number;
}

export interface AddMedicationPayload {
  medicalBillId: string;
  drugInformation: {
    id: string;
    drugId: string;
    unitId: string;
    usageId: string;
    quantity: number;
  };
}

export interface UpdateMedicalBillDetailPayload {
  id: string;
  body: {
    drugId?: string;
    unitId?: string;
    usageId?: string;
    quantity?: number;
  };
}

export interface CreatePaymentPayload {
  medicalBillId: string;
  patientId: string;
  medicalExamCost?: number;
  totalDrugCost?: number;
}

export interface MedicalBillSummary {
  id: string;
  diseaseTypeId: string;
  prediction: string;
  symptomDescription: string;
  status: MedicalBillStatus;
  patientFullName: string;
  createdAt: string;
}

export interface MedicalBillDetail {
  id: string;
  diseaseTypes: DiseaseType[];
  prediction: string;
  status: MedicalBillStatus;
  symptomDescription: string;
  patient: Patient;
  drugDetails: MedicalBillDrug[];
  createdAt: string;
}

export interface MedicalBillDrug {
  id: string;
  drug: Drug;
  unit: Unit;
  availableUnits: Unit[];
  usage: Usage;
  quantity: number;
  price: number;
}
