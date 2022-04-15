import { createModel } from '@rematch/core';
import { API } from 'consts';
import { CreatePatientPayload, Patient } from 'interfaces';
import { HttpService } from 'services';
import { RootModel } from '.';

interface PatientModalState {
  patients: Patient[];
  selectedPatient: Patient;
}

const defaultPatient: Patient = {
  id: '',
  fullName: '',
  gender: '',
  dayOfBirth: '',
  address: '',
  phoneNumber: '',
};

export const patientModel = createModel<RootModel>()({
  state: {
    patients: [],
    selectedPatient: { ...defaultPatient },
  } as PatientModalState,

  reducers: {
    setPatients: (state, payload: Patient[]) => ({ ...state, patients: payload }),
    setSelectedPatient: (state, payload: Patient) => ({ ...state, selectedPatient: payload }),
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
  }),
});
