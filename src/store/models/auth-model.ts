import { createModel } from '@rematch/core';
import { SignInPayload, SignUpPayload, User } from 'interfaces';
import { RootModel } from '.';

interface AuthModelState {
  currentUser: User;
}

export const authModel = createModel<RootModel>()({
  state: {
    currentUser: {},
  } as AuthModelState,

  reducers: {
    setCurrentUser: (state, payload) => ({ ...state, currentUser: payload }),
  },

  effects: (dispatch) => ({
    async doSignIn(payload: SignInPayload, state): Promise<any> {
      return new Promise(() =>
        setTimeout((resolve) => {
          dispatch.authModel.setCurrentUser({ username: 'trungdvu' });
          resolve('');
        }, 1000),
      );
    },

    async doSignUp(payload: SignUpPayload, state): Promise<any> {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve('');
        }, 1000),
      );
    },

    async doSignOut(): Promise<any> {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve('');
        }, 1000),
      );
    },
  }),
});
