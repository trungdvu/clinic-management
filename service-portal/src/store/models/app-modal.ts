import { createModel } from '@rematch/core';
import { RootModel } from '.';

const PING_RESOURCE = 'assets/files/ping.txt';
const REQUEST_TIMEOUT = 3000;

const timeout = (time: number, promise: Promise<any>) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('Request time out.')), time);
    promise.then(resolve, reject);
  });
};

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
      const controller = new AbortController();
      const { signal } = controller;

      if (!navigator.onLine) return navigator.onLine;

      try {
        await timeout(
          REQUEST_TIMEOUT,
          fetch(PING_RESOURCE, {
            method: 'GET',
            signal,
          }),
        );
        return true;
      } catch (error) {
        console.log('checkOnlineStatus', error);
        controller.abort();
      }

      return false;
    },
  }),
});
