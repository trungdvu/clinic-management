import { createModel } from '@rematch/core';
import { API } from 'consts';
import {
  AddMedicationPayload,
  CreatePaymentPayload,
  GetMoreMedicalBillSummariesPayload,
  MedicalBillDetail,
  MedicalBillSummary,
  NewMedicalBillPayload,
  UpdateMedicalBillDetailPayload,
  UpdateMedicalBillPayload,
} from 'interfaces';
import _ from 'lodash';
import { HttpService } from 'services';
import { uniqueBy } from 'utils';
import { RootModel } from '.';

type Page = 'allMedicalBillSummariesPage';
type HasMoreKey = 'allMedicalBillSummariesHasMore';

interface MedicalBillState {
  medicalBillSummaries: MedicalBillSummary[];
  selectedMedicalBillId: string;
  allMedicalBillSummariesHasMore: boolean;
  allMedicalBillSummariesPage: number;
  selectedMedicalBillDetail?: MedicalBillDetail;
}

export const medicalBillModel = createModel<RootModel>()({
  state: {
    medicalBillSummaries: [],
    selectedMedicalBillId: '',
    allMedicalBillSummariesPage: 0,
    allMedicalBillSummariesHasMore: true,
    selectedMedicalBillDetail: undefined,
  } as MedicalBillState,

  reducers: {
    setMedicalBillSummaries: (state, payload: MedicalBillSummary[]) => ({
      ...state,
      medicalBillSummaries: payload,
    }),
    setSelectedMedicalBillId: (state, payload: string) => ({
      ...state,
      selectedMedicalBillId: payload,
    }),
    setPage: (state, payload: { key: Page; value: number }) => ({
      ...state,
      [payload.key]: payload.value,
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
    setSelectedMedicalBillDetail: (state, payload?: MedicalBillDetail) => ({
      ...state,
      selectedMedicalBillDetail: payload,
    }),
  },

  effects: (dispatch) => ({
    async doCreateMedicalBill(payload: NewMedicalBillPayload, state) {
      try {
        const { allMedicalBillSummariesPage } = state.medicalBillModel;
        const page =
          allMedicalBillSummariesPage > 0
            ? allMedicalBillSummariesPage - 1
            : allMedicalBillSummariesPage;

        dispatch.medicalBillModel.setPage({
          key: 'allMedicalBillSummariesPage',
          value: page,
        });
        dispatch.medicalBillModel.setHasMore({
          key: 'allMedicalBillSummariesHasMore',
          value: true,
        });

        const endpoint = API.MEDICAL_BILLS;
        const { status } = await HttpService.post(endpoint, payload);

        if (status === 200) {
          await dispatch.medicalBillModel.doGetMoreMedicalBillSummaries({ page });
          return true;
        }
        return false;
      } catch (error) {
        console.log('doCreateMedicalBill', error);
        return false;
      }
    },

    async doGetMedicalBillDetail(payload: string) {
      try {
        const endpoint = API.MEDICAL_BILLS_ID(payload);
        const { data, status } = await HttpService.get(endpoint);
        if (status === 200) {
          dispatch.medicalBillModel.setSelectedMedicalBillDetail(data.data);
          return true;
        }
        return false;
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
        }
        return false;
      } catch (error) {
        console.log('doGetMedicalBillSummaries', error);
        return false;
      }
    },

    async doGetMoreMedicalBillSummaries(payload: GetMoreMedicalBillSummariesPayload, state) {
      try {
        const { medicalBillSummaries, allMedicalBillSummariesPage } = state.medicalBillModel;
        const endpoint = API.MEDICAL_BILLS_PARAMS({
          page: payload.page ?? allMedicalBillSummariesPage,
          limit: payload.limit ?? 20,
        });
        const { data, status } = await HttpService.get(endpoint);

        if (status === 200 && !_.isEmpty(data.data)) {
          const moreMedicalBillSummaries: MedicalBillSummary[] = data.data;

          dispatch.medicalBillModel.setMedicalBillSummaries(
            uniqueBy([...medicalBillSummaries, ...moreMedicalBillSummaries], 'id'),
          );
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

        if (status === 200) {
          const medicalBillSummaries = _.filter(
            state.medicalBillModel.medicalBillSummaries,
            (bill) => bill.id !== payload,
          );
          dispatch.medicalBillModel.setMedicalBillSummaries(medicalBillSummaries);
          return true;
        }
        return false;
      } catch (error) {
        console.log('doDeleteMedicalBill', error);
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

    async doAddMedication(payload: AddMedicationPayload) {
      try {
        const endpoint = API.MEDICAL_BILLS_DETAIL;
        const { status } = await HttpService.post(endpoint, payload);
        if (status === 200) {
          await dispatch.medicalBillModel.doGetMedicalBillDetail(payload.medicalBillId);
          return true;
        }
        return false;
      } catch (error) {
        console.log('doAddMedication', error);
        return false;
      }
    },

    async doUpdateMedicalBillDetail(payload: UpdateMedicalBillDetailPayload) {
      try {
        const endpoint = API.MEDICAL_BILLS_DETAIL_ID(payload.id);
        const { status } = await HttpService.put(endpoint, payload.body);
        return status === 200;
      } catch (error) {
        console.log('doUpdateMedicalBillDetail', error);
        return false;
      }
    },

    async doRemoveMedicalBillDetail(payload: string) {
      try {
        const endpoint = API.MEDICAL_BILLS_DETAIL_ID(payload);
        const { status } = await HttpService.delete(endpoint);
        return status === 200;
      } catch (error) {
        console.log('doDeleteMedicalBillDetail', error);
        return false;
      }
    },

    async doCreatePayment(payload: CreatePaymentPayload) {
      try {
        const endpoint = API.BILL_PAYMENTS;
        const { status } = await HttpService.post(endpoint, payload);
        return status === 200;
      } catch (error) {
        console.log('doCreatePayment', error);
        return false;
      }
    },
  }),
});
