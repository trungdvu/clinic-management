import { createModel } from '@rematch/core';
import { API } from 'consts';
import { CreatePatientPayload, Patient } from 'interfaces';
import _ from 'lodash';
import { HttpService } from 'services';
import { RootModel } from '.';

type Page = 'allPatientsPage';
type HasMore = 'allPatientsHasMore';

interface PatientModalState {
  patients: Patient[];
  allPatientsPage: number;
  allPatientsHasMore: boolean;
}

export const patientModel = createModel<RootModel>()({
  state: {
    patients: [],
    allPatientsPage: 0,
    allPatientsHasMore: true,
  } as PatientModalState,

  reducers: {
    setPatients: (state, payload: Patient[]) => ({ ...state, patients: payload }),
    setAllPatientsHasMore: (state, payload: boolean) => ({ ...state, allPatientsHasMore: payload }),
    increasePage: (state, payload: Page) => ({
      ...state,
      [payload]: state[payload] + 1,
    }),
    resetPage: (state, payload: Page) => ({
      ...state,
      [payload]: 0,
    }),
    setHasMore: (state, payload: { key: HasMore; value: boolean }) => ({
      ...state,
      [payload.key]: payload.value,
    }),
  },

  effects: (dispatch) => ({
    async doCreatePatient(payload: CreatePatientPayload) {
      try {
        const endpoint = API.PATIENTS;
        const response = await HttpService.post(endpoint, payload);

        if (response.status === 200) {
          dispatch.patientModel.doGetPatients();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log('doCreatePatient', error);
        return false;
      }
    },

    async doGetPatients(payload?: string) {
      try {
        const endpoint = API.PATIENTS_PARAMS({ text: payload || '' });
        const response = await HttpService.get(endpoint);

        if (response.status === 200) {
          const patients = response.data.data;
          dispatch.patientModel.setPatients(patients);
          return patients;
        } else {
          return false;
        }
      } catch (error) {
        console.log('doGetPatients', error);
        return false;
      }
    },

    async doGetMorePatients(payload: string | undefined, state) {
      try {
        const { patients, allPatientsPage } = state.patientModel;
        const endpoint = API.PATIENTS_PARAMS({
          text: payload || '',
          page: allPatientsPage,
          limit: 20,
        });
        const response = await HttpService.get(endpoint);

        if (response.status === 200 && !_.isEmpty(response.data.data)) {
          const morePatients: Patient[] = response.data.data;

          dispatch.patientModel.setPatients([...patients, ...morePatients]);
          dispatch.patientModel.increasePage('allPatientsPage');
          return morePatients;
        } else {
          dispatch.patientModel.setHasMore({ key: 'allPatientsHasMore', value: false });
          return false;
        }
      } catch (error) {
        console.log('doGetPatients', error);
        return false;
      }
    },

    async doDeletePatient(payload: string) {
      try {
        const endpoint = API.PATIENTS_ID(payload);
        const response = await HttpService.delete(endpoint);

        return response.status === 200;
      } catch (error) {
        console.log('doGetPatients', error);
        return false;
      }
    },

    async doGetPatientDetail(payload: string): Promise<false | Patient> {
      try {
        const endpoint = API.PATIENTS_ID(payload);
        const { status, data } = await HttpService.get(endpoint);

        if (status === 200) {
          const patient: Patient = data.data;
          return patient;
        } else {
          return false;
        }
      } catch (error) {
        console.log('doGetPatientDetails', error);
        return false;
      }
    },
  }),
});
