import { MedicalBillDrug } from './medical-bill-interfaces';
import { Patient } from './patient-interfaces';

export interface InvoiceSummary {
  id: string;
  patient: Patient;
  medicalExamCost: number;
  totalDrugCost: number;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  barCode?: string;
  qrCode?: string;
}

export interface InvoiceDetail {
  id: string;
  patient: Patient;
  medicalExamCost: number;
  drugDetails: MedicalBillDrug[];
  status: string;
  totalDrugCost: number;
  createdAt: string;
  createdBy: string;
  barCode?: string;
  qrCode?: string;
}
