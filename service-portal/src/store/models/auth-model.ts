import { createModel } from '@rematch/core';
import { AUTH_API } from 'consts';
import { SignInPayload, SignUpPayload, User } from 'interfaces';
import { HttpService } from 'services';
import { authLocalStorage, ErrorModel } from 'shared';
import { sleep } from 'utils/async-utils';
import { RootModel } from '.';

interface AuthModelState {
  currentUser?: User;
}

export const authModel = createModel<RootModel>()({
  state: {
    currentUser: undefined,
  } as AuthModelState,

  reducers: {
    setCurrentUser: (state, payload?: User) => ({ ...state, currentUser: payload }),
  },

  effects: (dispatch) => ({
    async doSignIn(payload: SignInPayload, state): Promise<boolean | ErrorModel> {
      try {
        const response = await HttpService.post(AUTH_API.SIGN_IN, payload);
        const { data, errorCode, status } = response;

        if (status === 200) {
          const { accessToken, profile } = data.data;
          authLocalStorage.setAccessToken(accessToken);
          authLocalStorage.setUser(profile);
          authLocalStorage.setPreviousEmail(payload.email);
          dispatch.authModel.setCurrentUser(profile);
          return true;
        }
        return new ErrorModel(data, errorCode, status);
      } catch (error) {
        console.error('doSignIn', error);
        return false;
      }
    },

    async doSignUp(payload: SignUpPayload, state): Promise<boolean | ErrorModel> {
      try {
        const response = await HttpService.post(AUTH_API.SIGN_UP, payload);
        const { data, errorCode, status } = response;

        if (status === 200) {
          const signInPayload: SignInPayload = {
            email: payload.email,
            password: payload.password,
          };
          const result = await dispatch.authModel.doSignIn(signInPayload);
          return result;
        }
        return new ErrorModel(data, errorCode, status);
      } catch (error) {
        console.error('doSignUp', error);
        return false;
      }
    },

    async doSignOut(): Promise<boolean> {
      try {
        await sleep(1000);
        authLocalStorage.setUser(undefined);
        authLocalStorage.setAccessToken('');
        dispatch.authModel.setCurrentUser(undefined);
        return true;
      } catch (error) {
        console.error('doSignOut', error);
        return false;
      }
    },
  }),
});
