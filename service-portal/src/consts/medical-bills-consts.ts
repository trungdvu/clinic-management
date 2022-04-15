import { MedicalBillStatus } from 'interfaces';

export const MEDICAL_BILLS_STATUSES: {
  [key in MedicalBillStatus]: string;
} = {
  pending: 'Pending',
  active: 'Active',
  completed: 'Completed',
};
