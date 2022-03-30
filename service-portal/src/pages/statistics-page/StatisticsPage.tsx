import React from 'react';
import { useTitle } from 'hooks';

interface Props {
  title?: string;
}

export const StatisticsPage = ({ title }: Props) => {
  useTitle(title);

  return <div>This is statistics page</div>;
};
