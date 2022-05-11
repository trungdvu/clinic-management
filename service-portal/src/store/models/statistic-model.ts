import { createModel } from '@rematch/core';
import { API } from 'consts/api-consts';
import {
  DrugUsageReport,
  DrugUsageReportPayload,
  MonthlyRevenue,
  MonthlyRevenuePayload,
} from 'interfaces';
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
    async doGetMonthlyRevenues(payload: MonthlyRevenuePayload) {
      try {
        const endpoint = API.REPORT_MONTHLY_QUERY({
          month: payload.month,
          year: payload.year,
        });
        const { status, data } = await HttpService.get(endpoint);

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

    async doGetDrugUsageReports(payload: DrugUsageReportPayload) {
      try {
        const endpoint = API.REPORT_DRUG_USAGE_QUERY({
          month: payload?.month,
          year: payload?.year,
        });

        const { status, data } = await HttpService.get(endpoint);

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
