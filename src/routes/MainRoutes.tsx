import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PAGE_ROUTES } from 'consts';
import { MainLayout, Redirect } from 'components';
import {
  AccountPage,
  BookingsPage,
  DashboardPage,
  HelpCenterPage,
  InvoicesPage,
  NotFoundPage,
  PatientsPage,
  ProfilePage,
  SignInPage,
  StatisticsPage,
  SupportPage,
} from 'pages';

export const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Redirect to={PAGE_ROUTES.DASHBOARD.PATH} />} />
        <Route
          path={PAGE_ROUTES.DASHBOARD.PATH}
          element={<DashboardPage title={PAGE_ROUTES.DASHBOARD.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.BOOKINGS.PATH}
          element={<BookingsPage title={PAGE_ROUTES.BOOKINGS.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.PATIENTS.PATH}
          element={<PatientsPage title={PAGE_ROUTES.PATIENTS.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.INVOICES.PATH}
          element={<InvoicesPage title={PAGE_ROUTES.INVOICES.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.STATISTICS.PATH}
          element={<StatisticsPage title={PAGE_ROUTES.STATISTICS.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.ACCOUNT.PATH}
          element={<AccountPage title={PAGE_ROUTES.ACCOUNT.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.PROFILE.PATH}
          element={<ProfilePage title={PAGE_ROUTES.PROFILE.TITLE} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route
        path={PAGE_ROUTES.SUPPORT.PATH}
        element={<SupportPage title={PAGE_ROUTES.SUPPORT.TITLE} />}
      />

      <Route
        path={PAGE_ROUTES.HELP_CENTER.PATH}
        element={<HelpCenterPage title={PAGE_ROUTES.HELP_CENTER.TITLE} />}
      />

      <Route
        path={PAGE_ROUTES.SIGN_IN.PATH}
        element={<SignInPage title={PAGE_ROUTES.SIGN_IN.TITLE} />}
      />
    </Routes>
  );
};
