import { createModel } from '@rematch/core';
import { API } from 'consts';
import {
  MedicalBillDetail,
  MedicalBillSumary,
  NewMedicalBillPayload,
  UpdateMedicalBillPayload,
} from 'interfaces';
import _ from 'lodash';
import { HttpService } from 'services';
import { RootModel } from '.';

type Page = 'allMedicalBillSummariesPage';
type HasMoreKey = 'allMedicalBillSummariesHasMore';

interface MedicalBillState {
  medicalBillSummaries: MedicalBillSumary[];
  selectedMedicalBillId: string;
  allMedicalBillSummariesHasMore: boolean;
  allMedicalBillSummariesPage: number;
}

export const medicalBillModel = createModel<RootModel>()({
  state: {
    medicalBillSummaries: [],
    selectedMedicalBillId: '',
    allMedicalBillSummariesPage: 0,
    allMedicalBillSummariesHasMore: true,
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
    increasePage: (state, payload: Page) => ({
      ...state,
      [payload]: state[payload] + 1,
    }),
    resetPage: (state, payload: Page) => ({
      ...state,
      [payload]: 0,
    }),
    setHasMore: (state, payload: { key: HasMoreKey; value: boolean }) => ({
      ...state,
      [payload.key]: payload.value,
    }),
  },

  effects: (dispatch) => ({
    async doCreateMedicalBill(payload: NewMedicalBillPayload) {
      try {
        const endpoint = API.MEDICAL_BILLS;
        const { status } = await HttpService.post(endpoint, payload);
        console.log('🚀 ~ status', status);
        if (status === 200) {
          await dispatch.medicalBillModel.doGetMoreMedicalBillSummaries(undefined);
          return true;
        }
      } catch (error) {
        console.log('doCreateMedicalBill', error);
      } finally {
        return false;
      }
    },

    async doGetMedicalBillDetails(payload: string) {
      try {
        const endpoint = API.MEDICAL_BILLS_ID(payload);
        const { data, status } = await HttpService.get(endpoint);

        if (status === 200) {
          const medicalBill: MedicalBillDetail = data.data;
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

    async doGetMoreMedicalBillSummaries(__: undefined, state) {
      try {
        const { medicalBillSummaries, allMedicalBillSummariesPage } = state.medicalBillModel;
        const endpoint = API.MEDICAL_BILLS_PARAMS({
          page: allMedicalBillSummariesPage,
          limit: 20,
        });
        console.log('🚀 ~ endpoint', endpoint);
        const { data, status } = await HttpService.get(endpoint);
        console.log('🚀 ~ data', data);

        if (status === 200 && !_.isEmpty(data.data)) {
          const moreMedicalBillSummaries = data.data;

          dispatch.medicalBillModel.setMedicalBillSummaries([
            ...medicalBillSummaries,
            ...moreMedicalBillSummaries,
          ]);
          dispatch.medicalBillModel.increasePage('allMedicalBillSummariesPage');

          return moreMedicalBillSummaries;
        } else {
          dispatch.medicalBillModel.setHasMore({
            key: 'allMedicalBillSummariesHasMore',
            value: false,
          });
          return false;
        }
      } catch (error) {
        console.log('doGetMoreMedicalBillSummaries', error);
        return false;
      }
    },

    async doDeleteMedicalBill(payload: string, state) {
      try {
        const endpoint = API.MEDICAL_BILLS_ID(payload);
        const { status } = await HttpService.delete(endpoint);
        console.log('🚀 ~ status', status);

        if (status === 200) {
          const medicalBillSummaries = _.filter(
            state.medicalBillModel.medicalBillSummaries,
            (bill) => bill.id !== payload,
          );
          dispatch.medicalBillModel.setMedicalBillSummaries(medicalBillSummaries);
          return true;
        }
      } catch (error) {
        console.log('doDeleteMedicalBill', error);
      } finally {
        return false;
      }
    },

    async doUpdateMedicalBill(payload: UpdateMedicalBillPayload) {
      try {
        const endpoint = API.MEDICAL_BILLS_ID(payload.id);
        const { status } = await HttpService.put(endpoint, payload.body);
        return status === 200;
      } catch (error) {
        console.log('doUpdateMedicalBill', error);
        return false;
      }
    },
  }),
});
