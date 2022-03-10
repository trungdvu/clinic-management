import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PAGE_ROUTES } from 'consts';
import { MainLayout, Redirect } from 'components';
import { DashboardPage, NotFoundPage, SignInPage } from 'pages';

export const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Redirect to={PAGE_ROUTES.DASHBOARD.PATH} />} />
        <Route
          path={PAGE_ROUTES.DASHBOARD.PATH}
          element={<DashboardPage title={PAGE_ROUTES.DASHBOARD.TITLE} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route
        path={PAGE_ROUTES.SIGN_IN.PATH}
        element={<SignInPage title={PAGE_ROUTES.SIGN_IN.TITLE} />}
      />
    </Routes>
  );
};
