import { createModel } from '@rematch/core';
import { API } from 'consts';
import { MedicalBillDetails, MedicalBillSumary, NewMedicalBillPayload } from 'interfaces';
import _ from 'lodash';
import { HttpService } from 'services';
import { RootModel } from '.';

interface MedicalBillState {
  medicalBillSummaries: MedicalBillSumary[];
  selectedMedicalBillId: string;
}

export const medicalBillModel = createModel<RootModel>()({
  state: {
    medicalBillSummaries: [],
    selectedMedicalBillId: '',
  } as MedicalBillState,

  reducers: {
    setMedicalBillSummaries: (state, payload: MedicalBillSumary[]) => ({
      ...state,
      medicalBillSummaries: payload,
    }),
    setSelectedMedicalBillId: (state, payload: string) => ({
      ...state,
      selectedMedicalBillId: payload,
    }),
  },

  effects: (dispatch) => ({
    async doCreateMedicalBill(payload: NewMedicalBillPayload) {
      try {
        const endpoint = API.MEDICAL_BILLS;
        const response = await HttpService.post(endpoint, payload);

        return response.status === 200;
      } catch (error) {
        console.log('doCreateMedicalBill', error);
        return false;
      }
    },

    async doGetMedicalBillDetails(payload: string) {
      try {
        const endpoint = API.MEDICAL_BILLS_ID(payload);
        const { data, status } = await HttpService.get(endpoint);

        if (status === 200) {
          const medicalBill: MedicalBillDetails = data.data;
          return medicalBill;
        } else {
          return false;
        }
      } catch (error) {
        console.log('doGetMedicalBillDetails', error);
        return false;
      }
    },

    async doGetMedicalBillSummaries(payload?: any) {
      try {
        const endpoint = API.MEDICAL_BILLS;
        const { data, status } = await HttpService.get(endpoint);

        if (status === 200) {
          const medicalBills = data.data;
          dispatch.medicalBillModel.setMedicalBillSummaries(medicalBills);
          return medicalBills;
        } else {
          return false;
        }
      } catch (error) {
        console.log('doGetMedicalBill', error);
        return false;
      }
    },

    async doDeleteMedicalBill(payload: string, state) {
      try {
        const endpoint = API.MEDICAL_BILLS_ID(payload);
        const { status } = await HttpService.delete(endpoint);
        if (status === 200) {
          const medicalBillSummaries = _.filter(
            state.medicalBillModel.medicalBillSummaries,
            (bill) => bill.id !== payload,
          );
          dispatch.medicalBillModel.setMedicalBillSummaries(medicalBillSummaries);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log('doDeleteMedicalBill', error);
        return false;
      }
    },
  }),
});
