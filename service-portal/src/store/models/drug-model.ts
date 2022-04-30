import { createModel } from '@rematch/core';
import { API } from 'consts';
import { Drug, DrugUnit, Usage } from 'interfaces';
import { HttpService } from 'services';
import { RootModel } from '.';

interface DrugModelState {}

export const drugModel = createModel<RootModel>()({
  state: {} as DrugModelState,

  reducers: {},

  effects: (dispatch) => ({
    async doGetDrugs(): Promise<false | Drug[]> {
      try {
        const endpoint = API.DRUGS;
        const { status, data } = await HttpService.get(endpoint);
        return status === 200 ? data.data : false;
      } catch (error) {
        console.log('doGetDrugs', error);
        return false;
      }
    },

    async doGetDrugUnits(payload: string): Promise<false | DrugUnit[]> {
      try {
        const endpoint = API.UNITS_PARAMS({
          drugId: payload,
        });
        const { status, data } = await HttpService.get(endpoint);
        return status === 200 ? data.data : false;
      } catch (error) {
        console.log('doGetDrugUnits', error);
        return false;
      }
    },

    async doGetDrugUsages(): Promise<false | Usage[]> {
      try {
        const endpoint = API.USAGES;
        const { status, data } = await HttpService.get(endpoint);
        return status === 200 ? data.data : false;
      } catch (error) {
        console.log('doGetDrugUsages', error);
        return false;
      }
    },
  }),
});
