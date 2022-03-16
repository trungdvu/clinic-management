import React from 'react';
import { useTitle } from 'hooks';

interface StatisticsPageProps {
  title?: string;
}

export const StatisticsPage: React.FC<StatisticsPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is statistics page</div>;
};
