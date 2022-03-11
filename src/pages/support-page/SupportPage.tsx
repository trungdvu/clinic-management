import React from 'react';
import { useTitle } from 'hooks';

interface SupportPageProps {
  title?: string;
}

export const SupportPage: React.FC<SupportPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is support page</div>;
};
