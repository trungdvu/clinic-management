import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout, Redirect } from 'components';
import { DashboardPage, NotFoundPage, SignInPage, SignUpPage } from 'pages';

export const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Redirect to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
};
