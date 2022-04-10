import { createModel } from '@rematch/core';
import { PATIENT_API } from 'consts';
import { CreatePatientPayload, Patient } from 'interfaces';
import { HttpService } from 'services';
import { RootModel } from '.';

interface PatientModalState {
  patients: Patient[];
  selectedPatientId: string;
}

export const patientModel = createModel<RootModel>()({
  state: {
    patients: [],
    selectedPatientId: '',
  } as PatientModalState,

  reducers: {
    setPatients: (state, payload: Patient[]) => ({ ...state, patients: payload }),
    setSelectedPatientId: (state, payload: string) => ({ ...state, selectedPatientId: payload }),
  },

  effects: (dispatch) => ({
    async doCreatePatient(payload: CreatePatientPayload): Promise<boolean> {
      try {
        const endpoint = PATIENT_API.PATIENTS;
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

    async doGetPatients(payload?: string): Promise<Patient[] | false> {
      try {
        const endpoint = `${PATIENT_API.PATIENTS}?text=${payload}`;
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
  }),
});
