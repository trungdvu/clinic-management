import React from 'react';
import { useTitle } from 'hooks';

interface PatientsPageProps {
  title?: string;
}

export const PatientsPage: React.FC<PatientsPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is patients page</div>;
};
