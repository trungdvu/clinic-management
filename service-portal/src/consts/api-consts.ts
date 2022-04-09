export const VERSION = 'v1.0.0';

export const AUTH_API = {
  SIGN_UP: `/${VERSION}/identities/sign-up`,
  SIGN_IN: `/${VERSION}/identities/sign-in`,
};

export const PATIENT_API = {
  PATIENTS: `/${VERSION}/patients`,
  PATIENT: (id: string) => `/${VERSION}/patients/${id}`,
};