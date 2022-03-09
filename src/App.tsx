import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { MainRoutes } from 'routes';
import { RootDispatch, RootState } from 'store';
import { useRouterLocation } from 'hooks';
import { PAGE_ROUTES } from 'consts';
import './App.css';

const AppContainer: React.FC<AppProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const { isInRoute } = useRouterLocation();

  useEffect(() => {
    if (_.isEmpty(currentUser) && !isInRoute(PAGE_ROUTES.SIGN_UP.PATH)) {
      navigate(PAGE_ROUTES.SIGN_IN.PATH);
    }
  }, [currentUser, isInRoute, navigate]);

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
