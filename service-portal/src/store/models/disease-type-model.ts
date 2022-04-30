import { createModel } from '@rematch/core';
import { API } from 'consts';
import { DiseaseType } from 'interfaces';
import { HttpService } from 'services';
import { RootModel } from '.';

interface DiseaseTypeState {}

export const diseaseTypeModel = createModel<RootModel>()({
  state: {} as DiseaseTypeState,

  reducers: {},

  effects: (dispatch) => ({
    async doGetDiseaseTypes(): Promise<false | DiseaseType[]> {
      try {
        const endpoint = API.DISEASE_TYPES;
        const response = await HttpService.get(endpoint);
        const { data, status } = response;

        if (status === 200) {
          return data.data as DiseaseType[];
        }
        return false;
      } catch (error) {
        console.error('doGetDiseaseTypes', error);
        return false;
      }
    },
  }),
});
