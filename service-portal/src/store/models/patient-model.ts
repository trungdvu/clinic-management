import { createModel } from '@rematch/core';
import { API } from 'consts';
import { CreatePatientPayload, GetMorePatientPayload, Patient } from 'interfaces';
import _ from 'lodash';
import { HttpService } from 'services';
import { uniqueBy } from 'utils';
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
    setPage: (state, payload: { key: Page; value: number }) => ({
      ...state,
      [payload.key]: payload.value,
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
    async doCreatePatient(payload: CreatePatientPayload, state) {
      try {
        const { allPatientsPage } = state.patientModel;
        const page = allPatientsPage > 0 ? allPatientsPage - 1 : allPatientsPage;

        dispatch.patientModel.setPage({
          key: 'allPatientsPage',
          value: page,
        });
        dispatch.patientModel.setHasMore({
          key: 'allPatientsHasMore',
          value: true,
        });

        const endpoint = API.PATIENTS;
        const response = await HttpService.post(endpoint, payload);

        if (response.status === 200) {
          await dispatch.patientModel.doGetMorePatients({ page });
          return true;
        }
        return false;
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
        }
        return false;
      } catch (error) {
        console.log('doGetPatients', error);
        return false;
      }
    },

    async doGetMorePatients(payload: GetMorePatientPayload, state) {
      try {
        const { patients, allPatientsPage } = state.patientModel;
        const endpoint = API.PATIENTS_PARAMS({
          text: payload.text ?? '',
          page: payload.page ?? allPatientsPage,
          limit: payload.limit ?? 2,
        });
        const response = await HttpService.get(endpoint);

        if (response.status === 200 && !_.isEmpty(response.data.data)) {
          const morePatients: Patient[] = response.data.data;

          dispatch.patientModel.setPatients(uniqueBy([...patients, ...morePatients], 'id'));
          dispatch.patientModel.increasePage('allPatientsPage');
          return morePatients;
        }

        dispatch.patientModel.setHasMore({ key: 'allPatientsHasMore', value: false });
        return false;
      } catch (error) {
        console.log('doGetMorePatients', error);
        return false;
      }
    },

    async doDeletePatient(payload: string) {
      try {
        const endpoint = API.PATIENTS_ID(payload);
        const response = await HttpService.delete(endpoint);

        return response.status === 200;
      } catch (error) {
        console.log('doDeletePatient', error);
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
        }
        return false;
      } catch (error) {
        console.log('doGetPatientDetails', error);
        return false;
      }
    },
  }),
});
