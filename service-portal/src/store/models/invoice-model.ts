import { createModel } from '@rematch/core';
import { API } from 'consts';
import { InvoiceDetail, InvoiceSummary } from 'interfaces';
import { HttpService } from 'services/api';
import { RootModel } from '.';

interface InvoiceModelState {
  invoices: InvoiceSummary[];
}

export const invoiceModel = createModel<RootModel>()({
  state: {} as InvoiceModelState,

  reducers: {
    setInvoices: (state, payload: InvoiceSummary[]) => ({ ...state, invoices: payload }),
  },

  effects: (dispatch) => ({
    async doGetInvoices(): Promise<false | InvoiceSummary[]> {
      try {
        const endpoint = API.BILL_PAYMENTS;
        const { data, status } = await HttpService.get(endpoint);

        if (status === 200) {
          dispatch.invoiceModel.setInvoices(data.data);
          return data.data;
        }
        return false;
      } catch (error) {
        console.log('doGetInvoices', error);
        return false;
      }
    },

    async doGetInvoiceDetail(payload: string): Promise<false | InvoiceDetail> {
      try {
        const endpoint = API.BILL_PAYMENTS_ID(payload);
        const { data, status } = await HttpService.get(endpoint);

        return status === 200 ? data.data : false;
      } catch (error) {
        console.log('doGetInvoiceDetail', error);
        return false;
      }
    },
  }),
});
