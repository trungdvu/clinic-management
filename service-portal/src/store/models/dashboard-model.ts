import { createModel } from '@rematch/core';
import { API } from 'consts';
import { DashboardSummaryTodayResponse } from 'interfaces/dashboard-interfaces';
import { HttpService } from 'services';
import { RootModel } from '.';

interface DashboardModelState {}

export const dashboardModel = createModel<RootModel>()({
  state: {} as DashboardModelState,

  reducers: {},

  effects: (dispatch) => ({
    async doGetDashboardSummary(): Promise<false | DashboardSummaryTodayResponse> {
      try {
        const endpoint = API.MEDICAL_BILLS_DASHBOARD_SUMMARY_TODAY;
        const { status, data } = await HttpService.get(endpoint);
        return status === 200 ? data.data : false;
      } catch (error) {
        console.log('doGetDashboardSummary');
        return false;
      }
    },
  }),
});
