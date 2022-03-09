import React from 'react';
import { useTitle } from 'hooks';

interface DashboardPageProps {}

export const DashboardPage: React.FC<DashboardPageProps> = () => {
  useTitle('GoodClinic - Dashboard');

  return <div>This is dashboard page</div>;
};
