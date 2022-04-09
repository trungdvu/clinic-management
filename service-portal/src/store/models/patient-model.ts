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
    async doCreatePatient(payload: CreatePatientPayload, state): Promise<boolean> {
      try {
        const response = await HttpService.post(PATIENT_API.PATIENTS, payload);
        return response.status === 200;
      } catch (error) {
        console.log('doCreatePatient', error);
        return false;
      }
    },
  }),
});
