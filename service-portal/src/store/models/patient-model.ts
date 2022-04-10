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
        const response = await HttpService.post(PATIENT_API.PATIENTS, payload);
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

    async doGetPatients(): Promise<Patient[] | false> {
      try {
        const response = await HttpService.get(PATIENT_API.PATIENTS);
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
