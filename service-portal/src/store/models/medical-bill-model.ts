import { createModel } from '@rematch/core';
import { MEDICAL_BILL_API } from 'consts';
import { NewMedicalBillPayload, Patient } from 'interfaces';
import { HttpService } from 'services';
import { RootModel } from '.';

interface MedicalBillState {
  medicalBills: any[];
  selectedMedicalBillId: string;
}

export const medicalBillModel = createModel<RootModel>()({
  state: {
    medicalBills: [],
    selectedMedicalBillId: '',
  } as MedicalBillState,

  reducers: {
    setMedicalBills: (state, payload: Patient[]) => ({ ...state, medicalBills: payload }),
    setSelectedMedicalBillId: (state, payload: string) => ({
      ...state,
      selectedMedicalBillId: payload,
    }),
  },

  effects: (dispatch) => ({
    async doCreateMedicalBill(payload: NewMedicalBillPayload) {
      try {
        const endpoint = MEDICAL_BILL_API.MEDICAL_BILLS;
        const response = await HttpService.post(endpoint, payload);

        return response.status === 200;
      } catch (error) {
        console.log('doCreateMedicalBill', error);
        return false;
      }
    },

    async doGetMedicalBill(payload: string) {
      try {
        const endpoint = `${MEDICAL_BILL_API.MEDICAL_BILLS}/${payload}`;
        const response = await HttpService.get(endpoint);

        if (response.status === 200) {
          const medicalBill = response.data.data;
          return medicalBill;
        } else {
          return false;
        }
      } catch (error) {
        console.log('doGetMedicalBill', error);
        return false;
      }
    },

    async doGetMedicalBills(payload?: any) {
      try {
        const endpoint = `${MEDICAL_BILL_API.MEDICAL_BILLS}`;
        const response = await HttpService.get(endpoint);

        if (response.status === 200) {
          const medicalBills = response.data.data;
          console.log('🚀 ~ medicalBills', medicalBills);
          return medicalBills;
        } else {
          return false;
        }
      } catch (error) {
        console.log('doGetMedicalBill', error);
        return false;
      }
    },
  }),
});
