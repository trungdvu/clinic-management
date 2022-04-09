import { createModel } from '@rematch/core';
import { AUTH_API } from 'consts';
import { SignInPayload, SignUpPayload, User } from 'interfaces';
import { HttpService } from 'services';
import { authLocalStorage } from 'shared';
import { sleep } from 'utils/async-utils';
import { RootModel } from '.';

interface AuthModelState {
  currentUser?: User;
  errorMessages: string[];
}

export const authModel = createModel<RootModel>()({
  state: {
    currentUser: undefined,
    errorMessages: [],
  } as AuthModelState,

  reducers: {
    setCurrentUser: (state, payload?: User) => ({ ...state, currentUser: payload }),
    setErrorMessages: (state, payload: string[]) => ({ ...state, errorMessages: payload }),
  },

  effects: (dispatch) => ({
    async doSignIn(payload: SignInPayload, state): Promise<boolean> {
      try {
        dispatch.authModel.setErrorMessages([]);

        const response = await HttpService.post(AUTH_API.SIGN_IN, payload);

        if (response.status === 200) {
          const { accessToken, profile } = response.data.data;
          authLocalStorage.setAccessToken(accessToken);
          authLocalStorage.setUser(profile);
          dispatch.authModel.setCurrentUser(profile);
          return true;
        } else {
          const errorMessages = ['The email or password is not correct'];
          dispatch.authModel.setErrorMessages(errorMessages);
          return false;
        }
      } catch (error) {
        console.error('doSignIn', error);
        return false;
      }
    },

    async doSignUp(payload: SignUpPayload, state): Promise<boolean> {
      try {
        dispatch.authModel.setErrorMessages([]);

        const response = await HttpService.post(AUTH_API.SIGN_UP, payload);

        if (response.status === 200) {
          const signInPayload: SignInPayload = {
            email: payload.email,
            password: payload.password,
          };
          const result = await dispatch.authModel.doSignIn(signInPayload);
          return result;
        } else {
          const errorMessages = ['Email has already existed, please trey another one'];
          dispatch.authModel.setErrorMessages(errorMessages);
          return false;
        }
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
