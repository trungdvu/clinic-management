import { createModel } from '@rematch/core';
import { API } from 'consts/api-consts';
import { DrugUsageReport, MonthlyRevenue } from 'interfaces';
import { HttpService } from 'services';
import { RootModel } from '.';

interface StatisticModelState {
  monthlyRevenues: MonthlyRevenue[];
  drugUsageReport: DrugUsageReport[];
}

export const statisticModel = createModel<RootModel>()({
  name: 'statisticModel',

  state: {
    monthlyRevenues: [],
    drugUsageReport: [],
  } as StatisticModelState,

  reducers: {
    setMonthlyRevenues: (state, payload: MonthlyRevenue[]) => ({
      ...state,
      monthlyRevenues: payload,
    }),
    setDrugUsageReports: (state, payload: DrugUsageReport[]) => ({
      ...state,
      drugUsageReport: payload,
    }),
  },

  effects: (dispatch) => ({
    async doGetMonthlyRevenues() {
      try {
        const endpoint = API.REPORT_MONTHLY;
        const { status, data } = await HttpService.get(endpoint);
        console.log('🚀 ~ data.data', data.data);

        if (status === 200) {
          dispatch.statisticModel.setMonthlyRevenues(data.data);
          return true;
        }
        return false;
      } catch (error) {
        console.error('doGetMonthlyRevenues', error);
        return false;
      }
    },

    async doGetDrugUsageReports() {
      try {
        const endpoint = API.REPORT_DRUG_USAGE;
        const { status, data } = await HttpService.get(endpoint);
        console.log('🚀 ~ drug usages', data.data);

        if (status === 200) {
          dispatch.statisticModel.setDrugUsageReports(data.data);
          return true;
        }
        return false;
      } catch (error) {
        console.error('doGetDrugUsageReports', error);
        return false;
      }
    },
  }),
});
