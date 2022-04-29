import { Models } from '@rematch/core';
import { authModel } from './auth-model';
import { patientModel } from './patient-model';
import { medicalBillModel } from './medical-bill-model';
import { drugModel } from './drug-model';
import { diseaseTypeModel } from './disease-type-model';

export interface RootModel extends Models<RootModel> {
  authModel: typeof authModel;
  patientModel: typeof patientModel;
  medicalBillModel: typeof medicalBillModel;
  drugModel: typeof drugModel;
  diseaseTypeModel: typeof diseaseTypeModel;
}

export const models: RootModel = {
  authModel,
  patientModel,
  medicalBillModel,
  drugModel,
  diseaseTypeModel,
};
