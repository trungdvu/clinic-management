import { Models } from '@rematch/core';
import { authModel } from './auth-model';
import { patientModel } from './patient-model';
import { medicalBillModel } from './medical-bill-model';

export interface RootModel extends Models<RootModel> {
  authModel: typeof authModel;
  patientModel: typeof patientModel;
  medicalBillModel: typeof medicalBillModel;
}

export const models: RootModel = { authModel, patientModel, medicalBillModel };
