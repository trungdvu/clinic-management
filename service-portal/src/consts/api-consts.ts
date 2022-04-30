import { toParamsUrl } from 'utils';

export const VERSION = 'v1.0.0';

export const API = {
  SIGN_UP: `/${VERSION}/identities/sign-up`,
  SIGN_IN: `/${VERSION}/identities/sign-in`,

  PATIENTS: `/${VERSION}/patients`,
  PATIENTS_ID: (id: string) => `/${VERSION}/patients/${id}`,
  PATIENTS_PARAMS: (params: any) => `/${VERSION}/patients${toParamsUrl(params)}`,

  MEDICAL_BILLS: `/${VERSION}/medical-bills`,
  MEDICAL_BILLS_ID: (id: string) => `/${VERSION}/medical-bills/${id}`,
  MEDICAL_BILLS_PARAMS: (params: any) => `/${VERSION}/medical-bills${toParamsUrl(params)}`,
  MEDICAL_BILLS_DETAIL: `/${VERSION}/medical-bill-detail`,
  MEDICAL_BILLS_DETAIL_ID: (id: string) => `/${VERSION}/medical-bill-detail/${id}`,

  DRUGS: `/${VERSION}/drugs`,

  DISEASE_TYPES: `/${VERSION}/disease-types`,

  UNITS_PARAMS: (params: any) => `/${VERSION}/units${toParamsUrl(params)}`,

  USAGES: `/${VERSION}/usages`,
};
