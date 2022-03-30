import { PAGE_ROUTES } from 'consts';
import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MainRoutes } from 'routes';
import { authLocalStorage } from 'shared';
import { RootDispatch, RootState } from 'store';
import './App.css';

interface Props extends PropsFromStores {}

const AppContainer = ({ currentUser, setCurrentUser }: Props) => {
  const navigate = useNavigate();

  const loadLocalStorages = useCallback(() => {
    authLocalStorage.load();
  }, []);

  useEffect(() => {
    loadLocalStorages();
    if (_.isEmpty(authLocalStorage.user) || _.isEmpty(authLocalStorage.accessToken)) {
      navigate(PAGE_ROUTES.SIGN_IN.PATH);
    } else {
      setCurrentUser(authLocalStorage.user);
    }
  }, [setCurrentUser, loadLocalStorages, navigate]);

  useEffect(() => {
    if (_.isEmpty(currentUser)) {
      navigate(PAGE_ROUTES.SIGN_IN.PATH);
    }
  }, [currentUser, navigate]);

  return <MainRoutes />;
};

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setCurrentUser: dispatch.authModel.setCurrentUser,
});

type PropsFromStores = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const App = connect(mapState, mapDispatch)(AppContainer);
