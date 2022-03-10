import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { MainRoutes } from 'routes';
import { RootDispatch, RootState } from 'store';
import { useRouterLocation } from 'hooks';
import { PAGE_ROUTES } from 'consts';
import { authLocalStorage } from 'shared';
import './App.css';

const AppContainer: React.FC<AppProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const { isInRoute } = useRouterLocation();

  const loadLocalStorages = useCallback(() => {
    authLocalStorage.load();
  }, []);

  useEffect(() => {
    loadLocalStorages();
    if (_.isEmpty(authLocalStorage.accessToken)) {
      // TODO: get user via token
      navigate(PAGE_ROUTES.SIGN_IN.PATH);
    }
  }, [currentUser, isInRoute, loadLocalStorages, navigate]);

  return (
    <>
      <MainRoutes />
    </>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({});

type AppProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const App = connect(mapState, mapDispatch)(AppContainer);
