import { toQueryParamsUrl } from 'utils';

export const VERSION = 'v1.0.0';

export const API = {
  SIGN_UP: `/${VERSION}/identities/sign-up`,
  SIGN_IN: `/${VERSION}/identities/sign-in`,

  PATIENTS: `/${VERSION}/patients`,
  PATIENTS_ID: (id: string) => `/${VERSION}/patients/${id}`,
  PATIENTS_PARAMS: (params: any) => `/${VERSION}/patients${toQueryParamsUrl(params)}`,

  MEDICAL_BILLS: `/${VERSION}/medical-bills`,
  MEDICAL_BILLS_DASHBOARD_SUMMARY_TODAY: `/${VERSION}/medical-bills/dashboard/summary-today`,
  MEDICAL_BILLS_ID: (id: string) => `/${VERSION}/medical-bills/${id}`,
  MEDICAL_BILLS_PARAMS: (params: any) => `/${VERSION}/medical-bills${toQueryParamsUrl(params)}`,
  MEDICAL_BILLS_DETAIL: `/${VERSION}/medical-bill-detail`,
  MEDICAL_BILLS_DETAIL_ID: (id: string) => `/${VERSION}/medical-bill-detail/${id}`,

  DRUGS: `/${VERSION}/drugs`,

  DISEASE_TYPES: `/${VERSION}/disease-types`,

  UNITS_PARAMS: (params: any) => `/${VERSION}/units${toQueryParamsUrl(params)}`,

  USAGES: `/${VERSION}/usages`,

  BILL_PAYMENTS: `/${VERSION}/bill-payments`,
  BILL_PAYMENTS_ID: (id: string) => `/${VERSION}/bill-payments/${id}`,

  REPORT_MONTHLY_QUERY: (query: any) =>
    `/${VERSION}/report/monthly-revenue-report${toQueryParamsUrl(query)}`,
  REPORT_DRUG_USAGE_QUERY: (query: any) =>
    `/${VERSION}/report/drug-usage-report${toQueryParamsUrl(query)}`,
};
