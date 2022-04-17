import { AuthenticatedLayout, Redirect } from 'components';
import { PAGE_ROUTES } from 'consts';
import { useScrollToTop } from 'hooks';
import {
  AccountPage,
  AccountRecoverPage,
  DashboardPage,
  HelpCenterPage,
  InvoicesPage,
  MedicalBillDetailsPage,
  MedicalBillPage,
  NotFoundPage,
  PatientDetailsPage,
  PatientsPage,
  ProfilePage,
  SignInPage,
  StatisticsPage,
  SupportPage,
} from 'pages';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const MainRoutes: React.FC = () => {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<AuthenticatedLayout />}>
        <Route index element={<Redirect to={PAGE_ROUTES.DASHBOARD.PATH} />} />
        <Route
          path={PAGE_ROUTES.DASHBOARD.PATH}
          element={<DashboardPage title={PAGE_ROUTES.DASHBOARD.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.MEDICAL_BILLS.PATH}
          element={<MedicalBillPage title={PAGE_ROUTES.MEDICAL_BILLS.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.MEDICAL_BILLS.DETAILS.PATH}
          element={<MedicalBillDetailsPage title={PAGE_ROUTES.MEDICAL_BILLS.DETAILS.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.PATIENTS.PATH}
          element={<PatientsPage title={PAGE_ROUTES.PATIENTS.TITLE} />}
        />
        <Route
          path={PAGE_ROUTES.PATIENTS.DETAILS.PATH}
          element={<PatientDetailsPage title={PAGE_ROUTES.PATIENTS.DETAILS.TITLE} />}
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

      <Route
        path={PAGE_ROUTES.ACCOUNT_RECOVER.PATH}
        element={<AccountRecoverPage title={PAGE_ROUTES.ACCOUNT_RECOVER.TITLE} />}
      />
    </Routes>
  );
};
