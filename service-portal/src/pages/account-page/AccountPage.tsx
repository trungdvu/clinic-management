import React from 'react';
import { useTitle } from 'hooks';

interface AccountPageProps {
  title?: string;
}

export const AccountPage: React.FC<AccountPageProps> = ({ title }) => {
  useTitle(title);

  return <div>This is account page</div>;
};
