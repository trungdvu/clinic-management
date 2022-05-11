import { Models } from '@rematch/core';
import { appModel } from './app-model';
import { authModel } from './auth-model';
import { dashboardModel } from './dashboard-model';
import { diseaseTypeModel } from './disease-type-model';
import { drugModel } from './drug-model';
import { invoiceModel } from './invoice-model';
import { medicalBillModel } from './medical-bill-model';
import { patientModel } from './patient-model';
import { statisticModel } from './statistic-model';

export interface RootModel extends Models<RootModel> {
  authModel: typeof authModel;
  patientModel: typeof patientModel;
  medicalBillModel: typeof medicalBillModel;
  drugModel: typeof drugModel;
  diseaseTypeModel: typeof diseaseTypeModel;
  appModel: typeof appModel;
  dashboardModel: typeof dashboardModel;
  invoiceModel: typeof invoiceModel;
  statisticModel: typeof statisticModel;
}

export const models: RootModel = {
  authModel,
  patientModel,
  medicalBillModel,
  drugModel,
  diseaseTypeModel,
  appModel,
  dashboardModel,
  invoiceModel,
  statisticModel,
};
