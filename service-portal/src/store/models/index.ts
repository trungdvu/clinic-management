import { Models } from '@rematch/core';
import { authModel } from './auth-model';
import { patientModel } from './patient-model';

export interface RootModel extends Models<RootModel> {
  authModel: typeof authModel;
  patientModel: typeof patientModel;
}

export const models: RootModel = { authModel, patientModel };
