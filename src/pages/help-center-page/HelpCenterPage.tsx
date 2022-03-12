import React from 'react';
import { useTitle } from 'hooks';

interface HelpCenterPageProps {
  title?: string;
}

export const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is help center page</div>;
};
