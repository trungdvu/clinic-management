import { createModel } from '@rematch/core';
import { SignInPayload, User } from 'interfaces';
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
        setTimeout(() => {
          console.log('Sign in');
        }, 3000),
      );
    },
  }),
});
