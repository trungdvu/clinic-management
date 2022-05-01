import { ErrorBoundary } from 'components';
import { PAGE_ROUTES } from 'consts';
import _ from 'lodash';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MainRoutes } from 'routes';
import { authLocalStorage } from 'shared';
import { RootDispatch, RootState } from 'store';
import './App.css';

interface Props extends PropsFromStore {}

const AppContainer = ({ currentUser, setCurrentUser }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    authLocalStorage.load();
    if (!_.isEmpty(authLocalStorage.accessToken) && !_.isEmpty(authLocalStorage.user)) {
      setCurrentUser(authLocalStorage.user);
    }
  }, [setCurrentUser]);

  useEffect(() => {
    if (_.isEmpty(authLocalStorage.accessToken)) {
      navigate(PAGE_ROUTES.SIGN_IN.PATH);
    }
  }, [currentUser]); // eslint-disable-line

  return (
    <ErrorBoundary>
      <MainRoutes />
    </ErrorBoundary>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.authModel.currentUser,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  setCurrentUser: dispatch.authModel.setCurrentUser,
});

type PropsFromStore = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

export const App = connect(mapState, mapDispatch)(AppContainer);
