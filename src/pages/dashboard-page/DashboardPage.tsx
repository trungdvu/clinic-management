import React from 'react';
import { useTitle } from 'hooks';

interface DashboardPageProps {
  title?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is dashboard page</div>;
};
