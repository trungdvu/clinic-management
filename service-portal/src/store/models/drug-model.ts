import { createModel } from '@rematch/core';
import { API } from 'consts';
import { Drug } from 'interfaces';
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
        if (status === 200) {
          return data.data as Drug[];
        }
        return false;
      } catch (error) {
        console.log('doGetDrugs', error);
        return false;
      }
    },
  }),
});
