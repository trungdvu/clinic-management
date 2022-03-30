import { createModel } from '@rematch/core';
import { AUTH_API } from 'consts';
import { SignInPayload, SignUpPayload, User } from 'interfaces';
import { HttpService } from 'services';
import { authLocalStorage } from 'shared';
import { RootModel } from '.';

interface AuthModelState {
  currentUser: User;
  errorMessages: string[];
}

export const authModel = createModel<RootModel>()({
  state: {
    currentUser: undefined!,
    errorMessages: [],
  } as AuthModelState,

  reducers: {
    setCurrentUser: (state, payload) => ({ ...state, currentUser: payload }),
    setErrorMessages: (state, payload) => ({ ...state, errorMessages: payload }),
  },

  effects: (dispatch) => ({
    async doSignIn(payload: SignInPayload, state): Promise<any> {
      dispatch.authModel.setErrorMessages([]);
      const response = await HttpService.post(AUTH_API.SIGN_IN, payload);
      if (response.status === 200) {
        const {
          data: { accessToken, profile },
        } = response.data;
        authLocalStorage.setAccessToken(accessToken);
        authLocalStorage.setUser(profile);
        dispatch.authModel.setCurrentUser(profile);
        return true;
      } else {
        const errorMessages = ['The email or password is not correct'];
        dispatch.authModel.setErrorMessages(errorMessages);
      }
      return false;
    },

    async doSignUp(payload: SignUpPayload, state): Promise<any> {
      dispatch.authModel.setErrorMessages([]);
      const response = await HttpService.post(AUTH_API.SIGN_UP, payload);
      if (response.status === 200) {
        const result = await dispatch.authModel.doSignIn({
          email: payload.email,
          password: payload.password,
        });
        return result;
      } else {
        const errorMessages = ['Email has already existed, please trey another one'];
        dispatch.authModel.setErrorMessages(errorMessages);
      }
      return false;
    },

    async doSignOut(): Promise<any> {
      authLocalStorage.setUser(undefined);
      authLocalStorage.setAccessToken('');
      dispatch.authModel.setCurrentUser(undefined);
    },
  }),
});
