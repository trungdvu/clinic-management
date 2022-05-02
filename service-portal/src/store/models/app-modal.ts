import { createModel } from '@rematch/core';
import { RootModel } from '.';

interface AppModelState {
  isOnline: boolean;
}

export const appModel = createModel<RootModel>()({
  state: {
    isOnline: true,
  } as AppModelState,

  reducers: {
    setIsOnline: (state, payload: boolean) => ({ ...state, isOnline: payload }),
  },

  effects: (dispatch) => ({
    async checkOnlineStatus() {
      if (!navigator.onLine) return navigator.onLine;
      return true;
    },
  }),
});
